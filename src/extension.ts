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
import { Credential } from "./types/credential";
import {
  authStatusEventEmitter,
  numberAssignmentEventEmitter,
} from "./emitters";
import { Telemetry } from "./telemetry";

let authCommands: AuthCommands;
let applicationCommands: ApplicationCommands;
let accountCommands: AccountCommands;
let numbersCommands: NumbersCommands;
let helpCommands: HelpCommands;

export async function activate(context: vscode.ExtensionContext) {
  Telemetry.initialize(context);

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

  authCommands = new AuthCommands(context.subscriptions);
  applicationCommands = new ApplicationCommands(
    context.subscriptions,
    applicationViewDataProvider,
  );
  accountCommands = new AccountCommands(
    context.subscriptions,
    accountViewDataProvider,
  );
  numbersCommands = new NumbersCommands(
    context.subscriptions,
    numbersViewDataProvider,
  );
  helpCommands = new HelpCommands(context.subscriptions, helpViewDataProvider);

  const authStatusChanged = async (credentials: Credential) => {
    applicationCommands.refreshAppsList();
    numbersCommands.refreshNumbersList();
    await accountCommands.refresh();
    await helpCommands.refresh();
  };
  authStatusEventEmitter.event(authStatusChanged);

  const numberAssignmentChanged = async () => {
    applicationCommands.refreshAppsList();
  };
  numberAssignmentEventEmitter.event(numberAssignmentChanged);
}

/**
 * Clean up the extension resources.
 */
export async function deactivate() {
  authCommands?.dispose();
  applicationCommands?.dispose();
  accountCommands?.dispose();
  numbersCommands?.dispose();
  helpCommands?.dispose();
  Telemetry.dispose();
}
