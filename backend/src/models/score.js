import { Schema, model } from "mongoose";

const scoreSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comicId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  }
});

export default model("Score", scoreSchema);
