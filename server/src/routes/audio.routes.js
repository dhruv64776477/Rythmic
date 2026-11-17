import { Router } from "express";
import {
  deleteAudio,
  getAudioById,
  getAudios,
  recordAudioPlay,
  togglePublishStatus,
  updateAudio,
  uploadAudio,
} from "../controllers/audio.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { audioUpload, upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAudios)
  .post(
    verifyJWT,
    audioUpload.fields([
      { name: "audioFile", maxCount: 1 },
      { name: "artwork", maxCount: 1 },
    ]),
    uploadAudio
  );

router.route("/toggle/publish/:audioId").patch(verifyJWT, togglePublishStatus);
router.route("/:audioId/play").post(verifyJWT, recordAudioPlay);
router
  .route("/:audioId")
  .get(getAudioById)
  .patch(verifyJWT, upload.single("artwork"), updateAudio)
  .delete(verifyJWT, deleteAudio);

export default router;
