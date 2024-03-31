import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

export const db = {
  userStore: null,
  collectionStore: null,
  placeStore: null,

  init() {
    this.userStore = userMemStore;
    this.collectionStore = collectionMemStore;
    this.placeStore = placeMemStore;
  },
};
