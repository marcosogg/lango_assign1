import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  place: String,
  category: String,
  description: String,
  lat: Number,
  long: Number,
  img: String,

  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
