import * as vscode from "vscode";
import { Auth } from "./auth";
import {
  AccountViewDataProvider,
  ApplicationViewDataProvider,
  HelpViewDataProvider,
  NumbersViewDataProvider,
} from "./views";
import {
  AccountCommands,
  ApplicationCommands,
  AuthCommands,
  HelpCommands,
  NumbersCommands,
} from "./commands";
import { authStatusEventEmitter } from "./emitters";
import { Subscriptions } from "./subscriptions";

export async function activate(context: vscode.ExtensionContext) {
  /**
   * Register commands & views
   */
  const applicationViewDataProvider = new ApplicationViewDataProvider();
  const accountViewDataProvider = new AccountViewDataProvider(
    context.globalState,
  );
  const numbersViewDataProvider = new NumbersViewDataProvider(
    context.globalState,
  );
  const helpViewDataProvider = new HelpViewDataProvider();

  new AuthCommands(subscriptions, authStatusEventEmitter);

  const applicationCommands = new ApplicationCommands(
    subscriptions,
    applicationViewDataProvider,
  );
  const accountCommands = new AccountCommands(
    subscriptions,
    accountViewDataProvider,
  );
  const numbersCommands = new NumbersCommands(
    subscriptions,
    numbersViewDataProvider,
  );
  const helpCommands = new HelpCommands(subscriptions, helpViewDataProvider);

  Subscriptions.activate(context.subscriptions);

  /**
   * Register changes in authentication to update views
   * @param credentials
   */
  const authStatusChanged = async (credentials: Credentials) => {
    applicationCommands.refreshAppsList();
    numbersCommands.refreshNumbersList();
    await accountCommands.refresh();
    await helpCommands.refresh();
  };

  Auth.onAuthStatusChanged(authStatusChanged);
}

/**
 * Clean up the extension resources.
 */
export async function deactivate() {}

export class Extension {
  private onAuthStatusChangedEvent = new vscode.EventEmitter<Credentials>();

  /**
   * Activate the extension
   */
  activate = async () => {
    /**
     * Set a global context item `vonage:authenticated`. This
     * setting is used to determine what commands/views/etc are
     * available to the user. The credentials are also used
     * when making requests from the Vonage API.
     */
    const authenticated = await Auth.isAuthenticated();
    vscode.commands.executeCommand(
      "setContext",
      "vonage:authenticated",
      authenticated,
    );

    const numberAssignmentChanged = async () => {
      applicationCommands.refreshAppsList();
    };
    numbersViewDataProvider.onNumberAssignmentChanged(numberAssignmentChanged);

    /**
     * Register tree views within activity bar
     */
    vscode.window.createTreeView("vonageAppView", {
      treeDataProvider: applicationViewDataProvider,
      showCollapseAll: false,
    });
    vscode.window.createTreeView("vonageNumbersView", {
      treeDataProvider: numbersViewDataProvider,
      showCollapseAll: false,
    });
    vscode.window.createTreeView("vonageAccountView", {
      treeDataProvider: accountViewDataProvider,
      showCollapseAll: false,
    });
    vscode.window.createTreeView("vonageHelpView", {
      treeDataProvider: helpViewDataProvider,
      showCollapseAll: false,
    });
  };

  deactivate = async () => {
    /**
     * Sign out and dispose of all credentials
     */
    Auth.logout();
    Auth.dispose();
  };
}
