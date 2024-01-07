import * as assert from "assert";
import * as Sinon from "sinon";
import { ApplicationCommands } from "../../../commands";
import { mocks } from "../../mocks/vscode";
import { vonage } from "../../mocks/vonage";
import {
  ApplicationViewDataProvider,
  ApplicationTreeItem,
} from "../../../views";
import { Telemetry } from "../../../telemetry";

suite("Commands:Applications", function () {
  const telemetryStub = Sinon.stub(Telemetry, "sendTelemetryEvent");

  const node = new ApplicationTreeItem(vonage.applicationMock);

  const viewProvider = new ApplicationViewDataProvider();

  this.beforeEach(() => {
    telemetryStub.resetHistory();
  });

  this.afterAll(() => {
    telemetryStub.restore();
  });

  const applicationsCommands = new ApplicationCommands(
    mocks.extensionContextMock.subscriptions,
    viewProvider,
  );

  test("refreshAppsList refreshes appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "refresh");

    applicationsCommands.refreshAppsList();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("addApp calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "createApplication");

    applicationsCommands.addApp();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("updateApp calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "updateApplication");

    applicationsCommands.updateApp(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("deleteApp calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "deleteApplication");

    applicationsCommands.deleteApp(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("linkApp calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "linkApplication");

    applicationsCommands.linkApp(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("voiceAdd calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "addVoice");

    applicationsCommands.voiceAdd(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("voiceUpdate calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "updateVoice");

    applicationsCommands.voiceUpdate(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("voiceDelete calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "deleteVoice");

    applicationsCommands.voiceDelete(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("rtcAdd calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "addRTC");

    applicationsCommands.rtcAdd(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("rtcUpdate calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "updateRTC");

    applicationsCommands.rtcUpdate(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("rtcDelete calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "deleteRTC");

    applicationsCommands.rtcDelete(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("messagesAdd calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "addMessages");

    applicationsCommands.messagesAdd(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("messagesUpdate calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "updateMessages");

    applicationsCommands.messagesUpdate(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("messagesDelete calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "deleteMessages");

    applicationsCommands.messagesDelete(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("vbcAdd calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "addVBC");

    applicationsCommands.vbcAdd(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("vbcDelete calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "deleteVBC");

    applicationsCommands.vbcDelete(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });
});
