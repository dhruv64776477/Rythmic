import mongoose, { Schema } from "mongoose";

const audioSchema = new Schema(
  {
    audioFile: {
      type: String,
      required: true,
    },
    artwork: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    plays: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "audios",
  }
);

export const Audio = mongoose.model("Audio", audioSchema);
