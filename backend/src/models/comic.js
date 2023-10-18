import { Schema, model } from "mongoose";

const comicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imagesPost: {
    type: Array,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  inscribed: {
    type: Boolean,
    default: false,
  },
  serie: {
    type: Schema.Types.ObjectId,
    ref: "Serie",
  },
  uploadData: {
    type: Date,
    default: Date.now,
  },
});

export default model("Comic", comicSchema);
