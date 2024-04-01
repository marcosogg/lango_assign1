import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { collectionMongoStore } from "./mongo/collection-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  collectionStore: null,
  placeStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.collectionStore = collectionJsonStore;
        this.placeStore = placeJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.collectionStore = collectionMongoStore;
        this.placeStore = placeMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.collectionStore = collectionMemStore;
        this.placeStore = placeMemStore;
    }
  }
};