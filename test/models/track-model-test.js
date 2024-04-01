import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCollections, testPlaces, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.collectionStore.deleteAllCollections();
    await db.placeStore.deleteAllPlaces();
    beethovenList = await db.collectionStore.addCollection(beethoven);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(beethovenList._id, testPlaces[i]);
    }
  });

  test("create single place", async () => {
    const mozartList = await db.collectionStore.addCollection(mozart);
    const place = await db.placeStore.addPlace(mozartList._id, concerto)
    assert.isNotNull(place._id);
    assertSubset (concerto, place);
  });

  test("create multiple placeApi", async () => {
    const places = await db.collectionStore.getCollectionById(beethovenList._id);
    assert.equal(testPlaces.length, testPlaces.length)
  });

  test("delete all placeApi", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const mozartList = await db.collectionStore.addCollection(mozart);
    const place = await db.placeStore.addPlace(mozartList._id, concerto)
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset (concerto, newPlace);
  });

  test("delete One Place - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlace(id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCollections.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a collection - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete One User - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCollections.length);
  });
});
