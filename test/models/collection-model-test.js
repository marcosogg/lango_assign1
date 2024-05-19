import { assert } from "chai";
import { Collection } from "../../src/models/mongo/collection.js";

describe("Collection Model tests", () => {
  it("should create a collection", async () => {
    const collection = new Collection({ title: "Test Collection" });
    const savedCollection = await collection.save();
    assert.isNotNull(savedCollection);
    assert.equal(savedCollection.title, "Test Collection");
  });

  it("should delete a collection", async () => {
    const collection = new Collection({ title: "Test Collection" });
    const savedCollection = await collection.save();
    await Collection.findByIdAndDelete(savedCollection._id);
    const deletedCollection = await Collection.findById(savedCollection._id);
    assert.isNull(deletedCollection);
  });
});
