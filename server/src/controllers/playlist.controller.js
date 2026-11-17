import { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { Audio } from "../models/audio.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const populatePlaylist = (query) =>
  query.populate("owner", "fullName username avatar").populate({
    path: "audios",
    select: "title artwork audioFile duration plays owner",
    populate: { path: "owner", select: "fullName username avatar" },
  });

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body || {};

  if (typeof name !== "string" || !name.trim()) {
    throw new ApiError(400, "Playlist name is required");
  }
  if (description !== undefined && typeof description !== "string") {
    throw new ApiError(400, "Playlist description must be a string");
  }

  const playlist = await Playlist.create({
    name: name.trim(),
    description: description?.trim() || "",
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const playlists = await populatePlaylist(Playlist.find({ owner: userId }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlists, "User playlists fetched successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }

  const playlist = await populatePlaylist(Playlist.findById(playlistId));

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addAudioToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, audioId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid playlist or audio id");
  }

  if (!(await Audio.exists({ _id: audioId, isPublished: true }))) {
    throw new ApiError(404, "Published audio not found");
  }

  const playlist = await populatePlaylist(
    Playlist.findOneAndUpdate(
      { _id: playlistId, owner: req.user._id },
      { $addToSet: { audios: audioId } },
      { new: true }
    )
  );
  if (!playlist) {
    throw new ApiError(404, "Playlist not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Audio added or already in playlist"));
});

const removeAudioFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, audioId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(audioId)) {
    throw new ApiError(400, "Invalid playlist or audio id");
  }

  const playlist = await populatePlaylist(
    Playlist.findOneAndUpdate(
      { _id: playlistId, owner: req.user._id },
      { $pull: { audios: audioId } },
      { new: true }
    )
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Audio removed from playlist"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }

  const playlist = await Playlist.findOneAndDelete({
    _id: playlistId,
    owner: req.user._id,
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found or not owned by user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { _id: playlistId }, "Playlist deleted successfully")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body || {};

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }

  const update = {};
  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      throw new ApiError(400, "Playlist name must be a non-empty string");
    }
    update.name = name.trim();
  }
  if (description !== undefined) {
    if (typeof description !== "string") {
      throw new ApiError(400, "Playlist description must be a string");
    }
    update.description = description.trim();
  }
  if (Object.keys(update).length === 0) {
    throw new ApiError(400, "At least one playlist field is required");
  }

  const playlist = await populatePlaylist(
    Playlist.findOneAndUpdate(
      { _id: playlistId, owner: req.user._id },
      { $set: update },
      { new: true, runValidators: true }
    )
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addAudioToPlaylist,
  removeAudioFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
