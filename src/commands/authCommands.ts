import { ProgressLocation, commands, window } from "vscode";
import { LoginFlow } from "../steps";
import { Auth } from "../auth";
import { Credential } from "../types/credential";
import { Telemetry } from "../telemetry";

export class AuthCommands {
  constructor(
    subscriptions: { dispose(): any }[],
    private authStatusEventEmitter: vscode.EventEmitter<Credential>,
  ) {
    subscriptions.push(commands.registerCommand("vonage.login", this.login));
    subscriptions.push(commands.registerCommand("vonage.logout", this.logout));
  }

  /**
   * Request and store Vonage API key & secret
   * in order to use extension.
   */
  login = async (): Promise<void> => {
    Telemetry.sendTelemetryEvent("vonage:login");

    const state = await LoginFlow.collectInputs();

    if (state.api_key?.length > 0 && state.api_secret?.length > 0) {
      await window.withProgress(
        {
          location: ProgressLocation.Notification,
          title: `Configuring extension"...`,
        },
        async () => {
          await Auth.login(state.api_key, state.api_secret);
        },
      );
    } else {
      window.showErrorMessage(
        "Your Vonage API key & secret are required to use the Vonage for VS Code extension.",
      );
    }
  };

  logout = async (): Promise<void> => {
    Telemetry.sendTelemetryEvent("vonage:logout");
    await Auth.logout();
  };
}
