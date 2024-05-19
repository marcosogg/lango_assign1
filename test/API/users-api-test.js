import { EventEmitter } from "events";
import { assert } from "chai";
import { langoService } from "./lango-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

describe("Users API tests", () => {
  let user = null;

  before(async () => {
    await langoService.deleteAllUsers();
    user = await langoService.createUser(maggie);
  });

  after(async () => {
    // Clean up if needed
  });

  it("should create user", async () => {
    const returnedUser = await langoService.createUser(maggie);
    assert.isNotNull(returnedUser);
    assertSubset(maggie, returnedUser);
  });

  it("should delete a user", async () => {
    const response = await langoService.deleteUser(user._id);
    assert.equal(response.status, 204);
    try {
      await langoService.getUser(user._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });

  it("should create multiple users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      await langoService.createUser(testUsers[i]);
    }
    const returnedUsers = await langoService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length);
    await langoService.deleteAllUsers();
    const emptyUsers = await langoService.getAllUsers();
    assert.equal(emptyUsers.length, 0);
  });

  it("should remove non-existent user", async () => {
    try {
      await langoService.deleteUser("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });
});
