import { Router } from "express";
import {
  addAudioToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeAudioFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createPlaylist);

router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

router.route("/add/:audioId/:playlistId").patch(addAudioToPlaylist);
router.route("/remove/:audioId/:playlistId").patch(removeAudioFromPlaylist);

router.route("/user/:userId").get(getUserPlaylists);

export default router;
