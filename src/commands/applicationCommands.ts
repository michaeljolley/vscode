import * as vscode from "vscode";
import { Telemetry } from "../telemetry";
import { ApplicationTreeItem, ApplicationViewDataProvider } from "../views";

export class ApplicationCommands {
  refreshAppsList = () => {
    Telemetry.sendTelemetryEvent("vonage:app:refreshAppsList");
    this.vonageApplicationViewDataProvider.refresh();
  };

  addApp = () => {
    Telemetry.sendTelemetryEvent("vonage:app:addApp");
    this.vonageApplicationViewDataProvider.createApplication();
  };

  updateApp = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:app:updateApp");
    if (node) {
      this.vonageApplicationViewDataProvider.updateApplication(node);
    }
  };

  deleteApp = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:app:deleteApp");
    if (node) {
      this.vonageApplicationViewDataProvider.deleteApplication(node);
    }
  };

  linkApp = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:app:link");
    if (node) {
      this.vonageApplicationViewDataProvider.linkApplication(node);
    }
  };

  voiceAdd = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:voice:add");
    if (node) {
      this.vonageApplicationViewDataProvider.addVoice(node);
    }
  };

  voiceUpdate = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:voice:update");
    if (node) {
      this.vonageApplicationViewDataProvider.updateVoice(node);
    }
  };

  voiceDelete = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:voice:delete");
    if (node) {
      this.vonageApplicationViewDataProvider.deleteVoice(node);
    }
  };

  rtcAdd = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:rtc:add");
    if (node) {
      this.vonageApplicationViewDataProvider.addRTC(node);
    }
  };

  rtcUpdate = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:rtc:update");
    if (node) {
      this.vonageApplicationViewDataProvider.updateRTC(node);
    }
  };

  rtcDelete = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:rtc:delete");
    if (node) {
      this.vonageApplicationViewDataProvider.deleteRTC(node);
    }
  };

  messagesAdd = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:messages:add");
    if (node) {
      this.vonageApplicationViewDataProvider.addMessages(node);
    }
  };

  messagesUpdate = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:messages:update");
    if (node) {
      this.vonageApplicationViewDataProvider.updateMessages(node);
    }
  };

  messagesDelete = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:messages:delete");
    if (node) {
      this.vonageApplicationViewDataProvider.deleteMessages(node);
    }
  };

  vbcAdd = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:vbc:add");
    if (node) {
      this.vonageApplicationViewDataProvider.addVBC(node);
    }
  };

  vbcDelete = (node?: ApplicationTreeItem) => {
    Telemetry.sendTelemetryEvent("vonage:vbc:delete");
    if (node) {
      this.vonageApplicationViewDataProvider.deleteVBC(node);
    }
  };

  private addAppCommand = vscode.commands.registerCommand(
    "vonage.app.addApp",
    this.addApp,
  );
  private updateAppCommand = vscode.commands.registerCommand(
    "vonage.app.updateApp",
    this.updateApp,
  );
  private deleteAppCommand = vscode.commands.registerCommand(
    "vonage.app.deleteApp",
    this.deleteApp,
  );
  private refreshAppsListCommand = vscode.commands.registerCommand(
    "vonage.app.refreshAppsList",
    this.refreshAppsList,
  );
  private linkAppCommand = vscode.commands.registerCommand(
    "vonage.app.link",
    this.linkApp,
  );
  private voiceAddCommand = vscode.commands.registerCommand(
    "vonage.app.voice.add",
    this.voiceAdd,
  );
  private voiceUpdateCommand = vscode.commands.registerCommand(
    "vonage.app.voice.update",
    this.voiceUpdate,
  );
  private voiceDeleteCommand = vscode.commands.registerCommand(
    "vonage.app.voice.delete",
    this.voiceDelete,
  );
  private rtcAddCommand = vscode.commands.registerCommand(
    "vonage.app.rtc.add",
    this.rtcAdd,
  );
  private rtcUpdateCommand = vscode.commands.registerCommand(
    "vonage.app.rtc.update",
    this.rtcUpdate,
  );
  private rtcDeleteCommand = vscode.commands.registerCommand(
    "vonage.app.rtc.delete",
    this.rtcDelete,
  );
  private messagesAddCommand = vscode.commands.registerCommand(
    "vonage.app.messages.add",
    this.messagesAdd,
  );
  private messagesUpdateCommand = vscode.commands.registerCommand(
    "vonage.app.messages.update",
    this.messagesUpdate,
  );
  private messagesDeleteCommand = vscode.commands.registerCommand(
    "vonage.app.messages.delete",
    this.messagesDelete,
  );
  private vbcAddCommand = vscode.commands.registerCommand(
    "vonage.app.vbc.add",
    this.vbcAdd,
  );
  private vbcDeleteCommand = vscode.commands.registerCommand(
    "vonage.app.vbc.delete",
    this.vbcDelete,
  );

  constructor(
    subscriptions: { dispose(): any }[],
    private vonageApplicationViewDataProvider: ApplicationViewDataProvider,
  ) {
    subscriptions.push(this.addAppCommand);
    subscriptions.push(this.updateAppCommand);
    subscriptions.push(this.deleteAppCommand);
    subscriptions.push(this.refreshAppsListCommand);
    subscriptions.push(this.linkAppCommand);
    subscriptions.push(this.voiceAddCommand);
    subscriptions.push(this.voiceUpdateCommand);
    subscriptions.push(this.voiceDeleteCommand);
    subscriptions.push(this.rtcAddCommand);
    subscriptions.push(this.rtcUpdateCommand);
    subscriptions.push(this.rtcDeleteCommand);
    subscriptions.push(this.messagesAddCommand);
    subscriptions.push(this.messagesUpdateCommand);
    subscriptions.push(this.messagesDeleteCommand);
    subscriptions.push(this.vbcAddCommand);
    subscriptions.push(this.vbcDeleteCommand);
  }

  dispose() {
    this.addAppCommand.dispose();
    this.updateAppCommand.dispose();
    this.deleteAppCommand.dispose();
    this.refreshAppsListCommand.dispose();
    this.linkAppCommand.dispose();
    this.voiceAddCommand.dispose();
    this.voiceUpdateCommand.dispose();
    this.voiceDeleteCommand.dispose();
    this.rtcAddCommand.dispose();
    this.rtcUpdateCommand.dispose();
    this.rtcDeleteCommand.dispose();
    this.messagesAddCommand.dispose();
    this.messagesUpdateCommand.dispose();
    this.messagesDeleteCommand.dispose();
    this.vbcAddCommand.dispose();
    this.vbcDeleteCommand.dispose();
  }
}
