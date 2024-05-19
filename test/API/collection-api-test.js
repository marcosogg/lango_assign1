import { expect } from "chai";
import { langoService } from "./lango-service.js";
import { maggie, mozart, testCollections } from "../fixtures.js";

describe("Collection API tests", function() {
  this.timeout(10000); // Set timeout for this suite

  let user = null;

  before(async () => {
    await langoService.deleteAllCollections();
    await langoService.deleteAllUsers();
    user = await langoService.createUser(maggie);
    mozart.userid = user._id;
  });

  it("should create collection", async () => {
    const returnedCollection = await langoService.createCollection(mozart);
    expect(returnedCollection).to.not.be.null;
  });

  it("should delete a collection", async () => {
    const collection = await langoService.createCollection(mozart);
    const response = await langoService.deleteCollection(collection._id);
    expect(response.status).to.equal(204);
    try {
      await langoService.getCollection(collection._id);
      expect.fail("Should not return a response");
    } catch (error) {
      expect(error.response.data.message).to.equal("No Collection with this id");
    }
  });

  it("should create multiple collections", async () => {
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userid = user._id;
      await langoService.createCollection(testCollections[i]);
    }
    const returnedLists = await langoService.getAllCollections();
    expect(returnedLists.length).to.equal(testCollections.length);
    await langoService.deleteAllCollections();
    const emptyLists = await langoService.getAllCollections();
    expect(emptyLists.length).to.equal(0);
  });

  it("should remove non-existent collection", async () => {
    try {
      await langoService.deleteCollection("not an id");
      expect.fail("Should not return a response");
    } catch (error) {
      expect(error.response.data.message).to.equal("No Collection with this id");
    }
  });
});
