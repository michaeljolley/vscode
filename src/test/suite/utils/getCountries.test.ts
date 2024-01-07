import * as assert from "assert";
import * as utils from "../../../utils";
import { StorageKeys } from "../../../enums/storageKeys";
import { TestMemento } from "../../mocks/vscode";

suite("Utils:getCountries", function () {
  const storage = new TestMemento();

  this.beforeEach(() => {
    storage.storage = new Map();
  });

  test("returns the most recently picked country selected", async () => {
    storage.update(StorageKeys.lastCountrySelected, "US");
    const countryList = utils.getCountries(storage);

    const selectedItem = countryList.find((f) => f.picked);

    assert.notEqual(selectedItem, undefined);
    assert.equal(selectedItem?.description, "US");
  });

  test("returns list of countries with no picked items when never used", async () => {
    const countryList = utils.getCountries(storage);

    assert.equal(
      countryList.find((f) => f.picked),
      undefined,
    );
  });
});
