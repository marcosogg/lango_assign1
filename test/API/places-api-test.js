import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { langoService } from "./lango-service.js";
import { maggie, mozart, testCollections, testPlaces, concerto } from "../fixtures.js";

suite("Place API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    await langoService.deleteAllCollections();
    await langoService.deleteAllUsers();
    await langoService.deleteAllPlaces();
    user = await langoService.createUser(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await langoService.createCollection(mozart);
  });

  teardown(async () => {});

  test("create place", async () => {
    const returnedPlace = await langoService.createPlace(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedPlace);
  });

  test("create Multiple places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await langoService.createPlace(beethovenSonatas._id, testPlaces[i]);
    }
    const returnedPlaces = await langoService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await langoService.getPlace(returnedPlaces[i]._id);
      assertSubset(place, returnedPlaces[i]);
    }
  });

  test("Delete PlaceApi", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await langoService.createPlace(beethovenSonatas._id, testPlaces[i]);
    }
    let returnedPlaces = await langoService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await langoService.deletePlace(returnedPlaces[i]._id);
    }
    returnedPlaces = await langoService.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("denormalised collection", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await langoService.createPlace(beethovenSonatas._id, testPlaces[i]);
    }
    const returnedCollection = await langoService.getCollection(beethovenSonatas._id);
    assert.equal(returnedCollection.places.length, testPlaces.length);
    for (let i = 0; i < testPlaces.length; i += 1) {
      assertSubset(testPlaces[i], returnedCollection.places[i]);
    }
  });
});
