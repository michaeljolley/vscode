import * as Sinon from "sinon";
import * as assert from "assert";
import { AccountCommands } from "../../../commands";
import { AccountViewDataProvider } from "../../../views";
import { mocks } from "../../mocks/vscode";
import { Telemetry } from "../../../telemetry";

suite("Commands:Account", function () {
  const viewProvider = new AccountViewDataProvider(
    mocks.extensionContextMock.globalState,
  );
  const telemetryStub = Sinon.stub(Telemetry, "sendTelemetryEvent");

  const accountCommands = new AccountCommands(
    mocks.extensionContextMock.subscriptions,
    viewProvider,
  );

  this.beforeEach(() => {
    telemetryStub.resetHistory();
  });

  this.afterAll(() => {
    telemetryStub.restore();
  });

  test("refresh calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "refresh");

    accountCommands.refresh();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });

  test("toggleBalanceView calls appropriate view", async () => {
    const stub = Sinon.stub(viewProvider, "toggleBalanceView");

    accountCommands.toggleBalanceView();

    assert.equal(telemetryStub.calledOnce, true);
    assert.equal(stub.calledOnce, true);
    stub.restore();
  });
});
