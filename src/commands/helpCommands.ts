import * as vscode from "vscode";
import { getExtensionInfo } from "../utils";
import { HelpViewDataProvider } from "../views";
import { Telemetry } from "../telemetry";

export class HelpCommands {
  refresh = async () => {
    Telemetry.sendTelemetryEvent("vonage:help:refresh");
    this.vonageHelpViewDataProvider.refresh();
  };

  openDocs = () => {
    Telemetry.sendTelemetryEvent("vonage:help:openDocs");
    vscode.env.openExternal(vscode.Uri.parse("https://developer.vonage.com"));
  };

  openReportIssue = () => {
    Telemetry.sendTelemetryEvent("vonage:help:openReportIssue");
    const { name, publisher } = getExtensionInfo();

    vscode.commands.executeCommand("vscode.openIssueReporter", {
      extensionId: `${publisher}.${name}`,
    });
  };

  private openDocsCommand = vscode.commands.registerCommand(
    "vonage.help.openDocs",
    this.openDocs,
  );
  private openReportIssueCommand = vscode.commands.registerCommand(
    "vonage.help.openReportIssue",
    this.openReportIssue,
  );

  constructor(
    subscriptions: { dispose(): any }[],
    private vonageHelpViewDataProvider: HelpViewDataProvider,
  ) {
    subscriptions.push(this.openDocsCommand);
    subscriptions.push(this.openReportIssueCommand);
  }

  dispose() {
    this.openDocsCommand.dispose();
    this.openReportIssueCommand.dispose();
  }
}
