import * as assert from "assert";
import * as Sinon from "sinon";
import * as vscode from "vscode";
import { HelpCommands } from "../../../commands";
import { HelpViewDataProvider } from "../../../views";
import { mocks } from "../../mocks/vscode";
import { Telemetry } from "../../../telemetry";

suite("Commands:Help", function () {
  const openExternalStub = Sinon.stub(vscode.env, "openExternal");
  const telemetryStub = Sinon.stub(Telemetry, "sendTelemetryEvent");

  const viewProvider = new HelpViewDataProvider();

  const helpCommands = new HelpCommands(
    mocks.extensionContextMock.subscriptions,
    viewProvider,
  );

  this.beforeEach(() => {
    openExternalStub.resetHistory();
    telemetryStub.resetHistory();
  });

  this.afterAll(() => {
    openExternalStub.restore();
    telemetryStub.restore();
  });

  test("refresh refreshes appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "refresh");

    helpCommands.refresh();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("openDocs opens external url", async () => {
    helpCommands.openDocs();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(openExternalStub.calledOnce, true);
  });

  test("openReportIssue fires an extension command", async () => {
    const stub = Sinon.stub(vscode.commands, "executeCommand");

    helpCommands.openReportIssue();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });
});
