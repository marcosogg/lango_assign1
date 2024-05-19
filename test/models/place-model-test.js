import { assert } from "chai";
import { Place } from "../../src/models/mongo/place.js";

describe("Place Model tests", () => {
  it("should create a place", async () => {
    const place = new Place({ title: "Test Place" });
    const savedPlace = await place.save();
    assert.isNotNull(savedPlace);
    assert.equal(savedPlace.title, "Test Place");
  });

  it("should delete a place", async () => {
    const place = new Place({ title: "Test Place" });
    const savedPlace = await place.save();
    await Place.findByIdAndDelete(savedPlace._id);
    const deletedPlace = await Place.findById(savedPlace._id);
    assert.isNull(deletedPlace);
  });
});
