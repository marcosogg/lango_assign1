import { assert } from "chai";
import { User } from "../../src/models/mongo/user.js";

describe("User Model tests", () => {
  it("should create a user", async () => {
    const user = new User({ name: "Test User" });
    const savedUser = await user.save();
    assert.isNotNull(savedUser);
    assert.equal(savedUser.name, "Test User");
  });

  it("should delete a user", async () => {
    const user = new User({ name: "Test User" });
    const savedUser = await user.save();
    await User.findByIdAndDelete(savedUser._id);
    const deletedUser = await User.findById(savedUser._id);
    assert.isNull(deletedUser);
  });
});
