import * as vscode from "vscode";
import { getExtensionInfo } from "../utils";
import { HelpViewDataProvider } from "../views";
import { Telemetry } from "../telemetry";

export class HelpCommands {
  constructor(
    subscriptions: { dispose(): any }[],
    private vonageHelpViewDataProvider: HelpViewDataProvider,
  ) {
    subscriptions.push(
      vscode.commands.registerCommand("vonage.help.openDocs", this.openDocs),
    );
    subscriptions.push(
      vscode.commands.registerCommand(
        "vonage.help.openReportIssue",
        this.openReportIssue,
      ),
    );
  }

  refresh = async () => {
    Telemetry.sendTelemetryEvent("vonage:help:refresh");
    this.vonageHelpViewDataProvider.refresh();
  };

  /**
   * Opens Vonage developer portal.
   * Ideally will open documentation for the extension.
   */
  openDocs = () => {
    Telemetry.sendTelemetryEvent("vonage:help:openDocs");
    vscode.env.openExternal(vscode.Uri.parse("https://developer.vonage.com"));
  };

  /**
   * Opens the VS Code report interface for users
   * to provide feedback on the extension.
   */
  openReportIssue = () => {
    Telemetry.sendTelemetryEvent("vonage:help:openReportIssue");
    const { name, publisher } = getExtensionInfo();

    vscode.commands.executeCommand("vscode.openIssueReporter", {
      extensionId: `${publisher}.${name}`,
    });
  };
}
