import { Schema, Types, model } from "mongoose";

const serieSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: Types.ObjectId, // Esto generará un nuevo ObjectId único por defecto
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  nameSerie: {
    type: String,
    required: true,
  },
  frontPage: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  typeContent: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  keywords: {
    type: Array,
    required: true,
  },
  partsSerie: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
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
  uploadData: {
    type: Date,
    default: Date.now,
  },
});

export default model("Serie", serieSchema);
