import * as assert from "assert";
import { HelpViewDataProvider } from "../../../views";

suite("Views:Help", function () {
  const viewProvider = new HelpViewDataProvider();

  test("buildTree provides the correct items", async () => {
    const treeItems = await viewProvider.getChildren();
    assert.equal(treeItems.length, 3);
  });
});
