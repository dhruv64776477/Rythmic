import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { ApiError } from "../utils/ApiError.js";

const uploadDirectory = join(tmpdir(), "rythmic-uploads");
mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (_req, file, cb) =>
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
});

const createUpload = (fileSize, acceptedMimeTypes) =>
  multer({
    storage,
    limits: { fileSize },
    fileFilter: (_req, file, cb) => {
      if (!acceptedMimeTypes.includes(file.mimetype)) {
        cb(new ApiError(400, "Unsupported upload file type"));
        return;
      }
      cb(null, true);
    },
  });

export const upload = createUpload(5 * 1024 * 1024, [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
export const audioUpload = createUpload(100 * 1024 * 1024, [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/mp4",
  "audio/aac",
  "audio/flac",
  "audio/webm",
  "audio/opus",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
