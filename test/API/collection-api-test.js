import { assert } from "chai";
import { langoService } from "./lango-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, mozart, testCollections } from "../fixtures.js";

suite("Collection API tests", () => {

  let user = null;

  setup(async () => {
    await langoService.deleteAllCollections();
    await langoService.deleteAllUsers();
    user = await langoService.createUser(maggie);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create collection", async () => {
    const returnedCollection = await langoService.createCollection(mozart);
    assert.isNotNull(returnedCollection);
    assertSubset(mozart, returnedCollection);
  });

  test("delete a collection", async () => {
    const collection = await langoService.createCollection(mozart);
    const response = await langoService.deleteCollection(collection._id);
    assert.equal(response.status, 204);
    try {
      const returnedCollection = await langoService.getCollection(collection.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Collection with this id", "Incorrect Response Message");
    }
  });

  test("create multiple collections", async () => {
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await langoService.createCollection(testCollections[i]);
    }
    let returnedLists = await langoService.getAllCollections();
    assert.equal(returnedLists.length, testCollections.length);
    await langoService.deleteAllCollections();
    returnedLists = await langoService.getAllCollections();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant collection", async () => {
    try {
      const response = await langoService.deleteCollection("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Collection with this id", "Incorrect Response Message");
    }
  });
});