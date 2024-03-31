import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { langoService } from "./lango-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("User API tests", () => {
  setup(async () => {
    await langoService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[0] = await langoService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await langoService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await langoService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await langoService.deleteAllUsers();
    returnedUsers = await langoService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user", async () => {
    const returnedUser = await langoService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await langoService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await langoService.deleteAllUsers();
    try {
      const returnedUser = await langoService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});