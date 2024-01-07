import { commands } from "vscode";
import { Telemetry } from "../telemetry";
import { AccountViewDataProvider } from "../views";

export class AccountCommands {
  refresh = async (): Promise<void> => {
    Telemetry.sendTelemetryEvent("vonage:account:refresh");
    this.accountViewDataProvider.refresh();
  };

  toggleBalanceView = async (): Promise<void> => {
    Telemetry.sendTelemetryEvent("vonage:account:toggleBalance");
    await this.accountViewDataProvider.toggleBalanceView();
  };

  private refreshCommand = commands.registerCommand(
    "vonage.account.refresh",
    this.refresh,
  );
  private toggleBalance = commands.registerCommand(
    "vonage.account.toggleBalanceView",
    this.toggleBalanceView,
  );

  constructor(
    subscriptions: { dispose(): any }[],
    private accountViewDataProvider: AccountViewDataProvider,
  ) {
    subscriptions.push(this.refreshCommand);
    subscriptions.push(this.toggleBalance);
  }

  dispose() {
    this.refreshCommand.dispose();
    this.toggleBalance.dispose();
  }
}
