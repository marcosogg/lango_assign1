import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const collections = await db.collectionStore.getUserCollections(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        collections: collections,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCollection: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.collectionStore.addCollection(newPlayList);
      return h.redirect("/dashboard");
    },
  },
};
