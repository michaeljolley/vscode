import * as assert from "assert";
import * as Sinon from "sinon";
import { NumbersCommands } from "../../../commands";
import { mocks } from "../../mocks/vscode";
import { vonage } from "../../mocks/vonage";
import { NumbersViewDataProvider, NumberTreeItem } from "../../../views";
import { Telemetry } from "../../../telemetry";

suite("Commands:Numbers", function () {
  const telemetryStub = Sinon.stub(Telemetry, "sendTelemetryEvent");

  const viewProvider = new NumbersViewDataProvider(
    mocks.extensionContextMock.globalState,
  );

  this.beforeEach(() => {
    telemetryStub.resetHistory();
  });

  this.afterAll(() => {
    telemetryStub.restore();
  });

  const numbersCommands = new NumbersCommands(
    mocks.extensionContextMock.subscriptions,
    viewProvider,
  );

  test("refreshNumbersList refreshes appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "refresh");

    numbersCommands.refreshNumbersList();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("buyNumber calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "buyNumber");

    numbersCommands.buyNumber();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("cancelNumber calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "cancelNumber");
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.cancelNumber(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("assignNumber calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "assignNumber");
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.assignNumber(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("unassignNumber calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "unassignNumber");
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.unassignNumber(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("copyNumber calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "copyNumber");
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.copyNumber(node);

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });
});
