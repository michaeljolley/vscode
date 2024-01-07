import * as vscode from "vscode";
import * as Sinon from "sinon";
import * as assert from "assert";
import { NumbersViewDataProvider, NumberTreeItem } from "../../../views";
import { vonage } from "../../mocks/vonage";
import { TestMemento } from "../../mocks/vscode";
import { VonageClient } from "../../../client/vonageClient";

suite("Views:Number", function () {
  const storage = new TestMemento();
  const viewProvider = new NumbersViewDataProvider(storage);
  const fakeGetNumbers = () => Promise.resolve([vonage.numberMock]);
  Sinon.replace(VonageClient.numbers, "getNumbers", fakeGetNumbers);

  this.beforeEach(function () {
    storage.storage = new Map();
  });

  test("buildTree displays numbers correctly", async () => {
    const treeItems = await viewProvider.getChildren();

    assert.equal(treeItems.length, 1);

    const treeItem = treeItems[0];

    assert.notEqual(treeItem, undefined);
    assert.notDeepStrictEqual(treeItem.label, undefined);
    if (treeItem && treeItem.label) {
      assert.equal(treeItem.label, `+${vonage.numberMock.msisdn}`);
    }
  });

  test("copyNumber adds the msisdn to the clipboard", async () => {
    const windowShowInformationMessageStub = Sinon.stub(
      vscode.window,
      "showInformationMessage",
    );
    const node = new NumberTreeItem(vonage.numberMock);

    await viewProvider.copyNumber(node);

    const clipboard = await vscode.env.clipboard.readText();

    assert.equal(clipboard, vonage.numberMock.msisdn);
    assert.equal(windowShowInformationMessageStub.calledOnce, true);

    windowShowInformationMessageStub.restore();
  });
});
