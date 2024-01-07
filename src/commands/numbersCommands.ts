import * as vscode from "vscode";
import { Telemetry } from "../telemetry";
import { NumbersViewDataProvider, NumberTreeItem } from "../views";

export class NumbersCommands {
  refreshNumbersList = () => {
    Telemetry.sendTelemetryEvent("vonage:number:refreshList");
    this.vonageNumbersViewDataProvider.refresh();
  };

  buyNumber = () => {
    Telemetry.sendTelemetryEvent("vonage:number:buy");
    this.vonageNumbersViewDataProvider.buyNumber();
  };

  cancelNumber = (node?: NumberTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:number:cancel");
    if (node) {
      this.vonageNumbersViewDataProvider.cancelNumber(node);
    }
  };

  assignNumber = (node?: NumberTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:number:assign");
    if (node) {
      this.vonageNumbersViewDataProvider.assignNumber(node);
    }
  };

  unassignNumber = (node?: NumberTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:number:unassign");
    if (node) {
      this.vonageNumbersViewDataProvider.unassignNumber(node);
    }
  };

  copyNumber = (node?: NumberTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:number:copy");
    if (node) {
      this.vonageNumbersViewDataProvider.copyNumber(node);
    }
  };

  private refreshNumbersListCommand = vscode.commands.registerCommand(
    "vonage.numbers.refreshNumbersList",
    this.refreshNumbersList,
  );
  private buyNumberCommand = vscode.commands.registerCommand(
    "vonage.numbers.buyNumber",
    this.buyNumber,
  );
  private assignNumberCommand = vscode.commands.registerCommand(
    "vonage.numbers.assign",
    this.assignNumber,
  );
  private unassignNumberCommand = vscode.commands.registerCommand(
    "vonage.numbers.unassign",
    this.unassignNumber,
  );
  private cancelNumberCommand = vscode.commands.registerCommand(
    "vonage.numbers.cancelNumber",
    this.cancelNumber,
  );
  private copyNumberCommand = vscode.commands.registerCommand(
    "vonage.numbers.copy",
    this.copyNumber,
  );

  constructor(
    subscriptions: { dispose(): any }[],
    private vonageNumbersViewDataProvider: NumbersViewDataProvider,
  ) {
    subscriptions.push(this.refreshNumbersListCommand);
    subscriptions.push(this.buyNumberCommand);
    subscriptions.push(this.assignNumberCommand);
    subscriptions.push(this.unassignNumberCommand);
    subscriptions.push(this.cancelNumberCommand);
    subscriptions.push(this.copyNumberCommand);
  }

  dispose() {
    this.refreshNumbersListCommand.dispose();
    this.buyNumberCommand.dispose();
    this.assignNumberCommand.dispose();
    this.unassignNumberCommand.dispose();
    this.cancelNumberCommand.dispose();
    this.copyNumberCommand.dispose();
  }
}
