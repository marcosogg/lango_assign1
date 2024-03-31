/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-import-module-exports */
// src/controllers/user-settings-controller.js
import Boom from "@hapi/boom"; // For error handling
import Joi from "@hapi/joi"; // Import Joi for validation if needed elsewhere
// eslint-disable-next-line import/no-import-module-exports
import { usersService } from "../services/users-service.js"; // Assuming you have a service layer for user operations

// Display current user settings
exports.displaySettings = async (request, h) => {
  try {
    const userId = request.auth.credentials.id; // Assuming you're storing user ID in auth credentials
    const user = await usersService.findById(userId); // Find the current user by ID

    if (!user) {
      return Boom.notFound("User not found");
    }

    return h.view("user-settings-view", { user }); // Render the settings page with user data
  } catch (error) {
    console.error("Error displaying user settings:", error);
    return Boom.badImplementation("Failed to display user settings");
  }
};

// Update user settings based on form submission
exports.updateSettings = async (request, h) => {
  try {
    const userId = request.auth.credentials.id; // Assuming user ID is stored in auth credentials
    const updateData = request.payload; // The submitted form data

    if (updateData.password === "") {
      delete updateData.password; // Avoid updating the password if the field was left blank
    }

    await usersService.updateById(userId, updateData); // Update the user with the new data

    return h.redirect("/user/settings").state("flash", { type: "success", message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating user settings:", error);
    return h.view("user-settings-view", {
      user: request.payload,
      errorMessage: "Failed to update settings. Please try again.",
    });
  }
};
