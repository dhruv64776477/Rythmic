import { isValidObjectId } from "mongoose";
import { Audio } from "../models/audio.model.js";
import { Playlist } from "../models/playlist.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const parsePositiveInteger = (
  value,
  defaultValue,
  maximum = Number.MAX_SAFE_INTEGER
) => {
  if (
    Array.isArray(value) ||
    (typeof value !== "string" && value !== undefined)
  ) {
    throw new ApiError(400, "Pagination values must be positive integers");
  }
  if (value === undefined) {
    return defaultValue;
  }

  if (!/^\d+$/.test(value)) {
    throw new ApiError(400, "Pagination values must be positive integers");
  }

  const parsedValue = Number(value);
  if (
    !Number.isSafeInteger(parsedValue) ||
    parsedValue < 1 ||
    parsedValue > maximum
  ) {
    throw new ApiError(400, "Pagination value is out of range");
  }

  return parsedValue;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getAudios = asyncHandler(async (req, res) => {
  const page = parsePositiveInteger(req.query.page, 1);
  const limit = parsePositiveInteger(req.query.limit, 20, 100);
  const offset = (page - 1) * limit;
  if (!Number.isSafeInteger(offset)) {
    throw new ApiError(400, "Page value is out of range");
  }
  if (req.query.search !== undefined && typeof req.query.search !== "string") {
    throw new ApiError(400, "Search query must be a string");
  }
  const search = (req.query.search || "").trim();

  if (search.length > 100) {
    throw new ApiError(400, "Search query must be 100 characters or fewer");
  }

  const filter = { isPublished: true };
  if (search) {
    const searchPattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [{ title: searchPattern }, { description: searchPattern }];
  }

  const [audios, totalAudios] = await Promise.all([
    Audio.find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("owner", "fullName username avatar"),
    Audio.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        audios,
        page,
        limit,
        totalAudios,
        totalPages: Math.ceil(totalAudios / limit),
      },
      "Audio tracks fetched successfully"
    )
  );
});

const getAudioById = asyncHandler(async (req, res) => {
  const { audioId } = req.params;
  if (!isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid audio id");
  }

  const audio = await Audio.findOne({
    _id: audioId,
    isPublished: true,
  }).populate("owner", "fullName username avatar");

  if (!audio) {
    throw new ApiError(404, "Audio track not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, audio, "Audio track fetched successfully"));
});

const recordAudioPlay = asyncHandler(async (req, res) => {
  const { audioId } = req.params;
  if (!isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid audio id");
  }

  const audio = await Audio.findOneAndUpdate(
    { _id: audioId, isPublished: true },
    { $inc: { plays: 1 } },
    { new: true }
  );
  if (!audio) {
    throw new ApiError(404, "Audio track not found");
  }

  await User.updateOne(
    { _id: req.user._id },
    { $addToSet: { listeningHistory: audio._id } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, audio, "Audio play recorded"));
});

const uploadAudio = asyncHandler(async (req, res) => {
  const { title, description, duration } = req.body || {};
  const audioFile = req.files?.audioFile?.[0];
  const artworkFile = req.files?.artwork?.[0];
  const parsedDuration = Number(duration);

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    !Number.isFinite(parsedDuration) ||
    parsedDuration <= 0
  ) {
    throw new ApiError(
      400,
      "Title, description, and a positive duration are required"
    );
  }
  if (!audioFile?.path || !artworkFile?.path) {
    throw new ApiError(400, "Audio and artwork files are required");
  }
  if (!audioFile.mimetype.startsWith("audio/")) {
    throw new ApiError(400, "audioFile must be an audio file");
  }
  if (!artworkFile.mimetype.startsWith("image/")) {
    throw new ApiError(400, "artwork must be an image");
  }

  const [audioAsset, artworkAsset] = await Promise.all([
    uploadOnCloudinary(audioFile.path),
    uploadOnCloudinary(artworkFile.path),
  ]);
  if (!audioAsset?.secure_url || !artworkAsset?.secure_url) {
    throw new ApiError(502, "Audio or artwork upload failed");
  }

  const audio = await Audio.create({
    audioFile: audioAsset.secure_url,
    artwork: artworkAsset.secure_url,
    title: title.trim(),
    description: description.trim(),
    duration: parsedDuration,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, audio, "Audio track uploaded successfully"));
});

const updateAudio = asyncHandler(async (req, res) => {
  const { audioId } = req.params;
  if (!isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid audio id");
  }

  const update = {};
  const { title, description } = req.body || {};

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      throw new ApiError(400, "Audio title must be a non-empty string");
    }
    update.title = title.trim();
  }
  if (description !== undefined) {
    if (typeof description !== "string" || !description.trim()) {
      throw new ApiError(400, "Audio description must be a non-empty string");
    }
    update.description = description.trim();
  }
  if (req.file?.path) {
    const artwork = await uploadOnCloudinary(req.file.path);
    if (!artwork?.secure_url) {
      throw new ApiError(502, "Artwork upload failed");
    }
    update.artwork = artwork.secure_url;
  }
  if (Object.keys(update).length === 0) {
    throw new ApiError(400, "At least one audio field is required");
  }

  const audio = await Audio.findOneAndUpdate(
    { _id: audioId, owner: req.user._id },
    { $set: update },
    { new: true, runValidators: true }
  );
  if (!audio) {
    throw new ApiError(404, "Audio track not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, audio, "Audio track updated successfully"));
});

const deleteAudio = asyncHandler(async (req, res) => {
  const { audioId } = req.params;
  if (!isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid audio id");
  }

  const audio = await Audio.findOneAndDelete({
    _id: audioId,
    owner: req.user._id,
  });
  if (!audio) {
    throw new ApiError(404, "Audio track not found or not owned by user");
  }

  await Promise.all([
    Playlist.updateMany(
      { audios: audio._id },
      { $pull: { audios: audio._id } }
    ),
    User.updateMany(
      { listeningHistory: audio._id },
      { $pull: { listeningHistory: audio._id } }
    ),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, { _id: audioId }, "Audio track deleted"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { audioId } = req.params;
  if (!isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid audio id");
  }

  const audio = await Audio.findOne({ _id: audioId, owner: req.user._id });
  if (!audio) {
    throw new ApiError(404, "Audio track not found or not owned by user");
  }

  audio.isPublished = !audio.isPublished;
  await audio.save();

  return res
    .status(200)
    .json(new ApiResponse(200, audio, "Audio availability updated"));
});

export {
  deleteAudio,
  getAudioById,
  getAudios,
  recordAudioPlay,
  togglePublishStatus,
  updateAudio,
  uploadAudio,
};
