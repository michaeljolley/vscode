import { ProgressLocation, commands, window } from "vscode";
import { LoginFlow } from "../steps";
import { Auth } from "../auth";
import { Telemetry } from "../telemetry";

export class AuthCommands {
  login = async (): Promise<void> => {
    Telemetry.sendTelemetryEvent("vonage:login");

    const state = await LoginFlow.collectInputs();

    if (state.apiKey?.length > 0 && state.apiSecret?.length > 0) {
      await window.withProgress(
        {
          location: ProgressLocation.Notification,
          title: `Configuring extension"...`,
        },
        async () => {
          await Auth.login(state.apiKey, state.apiSecret);
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

  private loginCommand = commands.registerCommand("vonage.login", this.login);
  private logoutCommand = commands.registerCommand(
    "vonage.logout",
    this.logout,
  );

  constructor(subscriptions: { dispose(): any }[]) {
    subscriptions.push(this.loginCommand);
    subscriptions.push(this.logoutCommand);
  }

  dispose() {
    this.loginCommand.dispose();
    this.logoutCommand.dispose();
  }
}
