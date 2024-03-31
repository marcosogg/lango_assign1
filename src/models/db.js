// import { userMemStore } from "./mem/user-mem-store.js";
// import { collectionMemStore } from "./mem/collection-mem-store.js";
// import { placeMemStore } from "./mem/place-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

export const db = {
  userStore: null,
  collectionStore: null,
  placeStore: null,

  init() {
    this.userStore = userJsonStore;
    this.collectionStore = collectionJsonStore;
    this.placeStore = placeJsonStore;
  },
};
