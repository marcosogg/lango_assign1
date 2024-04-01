import { PlaceSpec } from "../models/joi-schemas.js";
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
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("collection-view", { title: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newPlace = {
        place: request.payload.place,
        category: request.payload.category,
        description: request.payload.description,
        lat: Number(request.payload.lat),
        long: Number(request.payload.long),
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
