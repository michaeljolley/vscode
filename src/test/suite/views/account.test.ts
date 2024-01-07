import * as assert from "assert";
import * as Sinon from "sinon";
import { VonageClient } from "../../../client/vonageClient";
import { AccountViewDataProvider } from "../../../views";
import { TestMemento } from "../../mocks/vscode";
import { StorageKeys } from "../../../enums/storageKeys";
import { Telemetry } from "../../../telemetry";

suite("Views:Account", function () {
  const telemetryStub = Sinon.stub(Telemetry, "sendTelemetryEvent");

  const storage = new TestMemento();
  let viewProvider: AccountViewDataProvider;
  const fakeGetBalance = () => Promise.resolve(1.784);
  Sinon.replace(VonageClient.account, "getBalance", fakeGetBalance);

  this.beforeEach(() => {
    storage.storage = new Map();
    viewProvider = new AccountViewDataProvider(storage);
    telemetryStub.resetHistory();
  });

  this.afterAll(() => {
    telemetryStub.restore();
  });

  test("buildTree hides balance when appropriate", async () => {
    storage.update(StorageKeys.hideAccountBalance, true);

    const treeItems = await viewProvider.getChildren();

    const balanceTreeItem = treeItems[0];

    assert.notEqual(balanceTreeItem, undefined);
    assert.notDeepStrictEqual(balanceTreeItem.label, undefined);

    if (balanceTreeItem && balanceTreeItem.label) {
      assert.equal(balanceTreeItem.label, `Balance: € ----`);
    }
  });

  test("buildTree shows balance when appropriate", async () => {
    const treeItems = await viewProvider.getChildren();

    const balanceTreeItem = treeItems[0];

    assert.notEqual(balanceTreeItem, undefined);
    assert.notDeepStrictEqual(balanceTreeItem.label, undefined);

    if (balanceTreeItem && balanceTreeItem.label) {
      assert.equal(balanceTreeItem.label, `Balance: € 1.78`);
    }
  });

  test("toggleBalanceView toggles hideAccountBalance setting", async () => {
    await viewProvider.toggleBalanceView();

    const shouldHide = storage.get(StorageKeys.hideAccountBalance);
    assert.equal(shouldHide, true);
  });
});
