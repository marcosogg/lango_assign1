// import { userMemStore } from "./mem/user-mem-store.js";
// import { playlistMemStore } from "./mem/playlist-mem-store.js";
// import { trackMemStore } from "./mem/track-mem-store.js";

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
