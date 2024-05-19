import { EventEmitter } from "events";
import { assert } from "chai";
import { langoService } from "./lango-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, mozart, testCollections } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

describe("Places API tests", () => {
  let user = null;

  before(async () => {
    await langoService.deleteAllPlaces();
    await langoService.deleteAllUsers();
    user = await langoService.createUser(maggie);
    mozart.userid = user._id;
  });

  after(async () => {
    // Clean up if needed
  });

  it("should create place", async () => {
    const returnedPlace = await langoService.createPlace(mozart);
    assert.isNotNull(returnedPlace);
    assertSubset(mozart, returnedPlace);
  });

  it("should delete a place", async () => {
    const place = await langoService.createPlace(mozart);
    const response = await langoService.deletePlace(place._id);
    assert.equal(response.status, 204);
    try {
      await langoService.getPlace(place._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Place with this id", "Incorrect Response Message");
    }
  });

  it("should create multiple places", async () => {
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userid = user._id;
      await langoService.createPlace(testCollections[i]);
    }
    let returnedLists = await langoService.getAllPlaces();
    assert.equal(returnedLists.length, testCollections.length);
    await langoService.deleteAllPlaces();
    returnedLists = await langoService.getAllPlaces();
    assert.equal(returnedLists.length, 0);
  });

  it("should remove non-existent place", async () => {
    try {
      await langoService.deletePlace("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Place with this id", "Incorrect Response Message");
    }
  });
});
