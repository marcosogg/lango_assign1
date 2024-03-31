import { db } from "../models/db.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const viewData = {
        title: "Collection",
        collection: collection,
      };
      return h.view("collection-view", viewData);
    },
  },

  addPlace: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newPlace = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.placeStore.addPlace(collection._id, newPlace);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
  deletePlace: {
    handler: async function(request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
};
