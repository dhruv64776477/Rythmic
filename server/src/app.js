import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs/promises";
import { ApiError } from "./utils/ApiError.js";

const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  process.env.CORS_ORIGEN ||
  process.env.FRONTEND_URL ||
  "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new ApiError(403, "Origin not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import audioRouter from "./routes/audio.routes.js";

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/audios", audioRouter);

app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.path}`));
});

app.use((error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const statusCode =
    error.code === 11000
      ? 409
      : error.name === "ValidationError" || error.name === "CastError"
      ? 400
      : error.code === "LIMIT_FILE_SIZE"
      ? 413
      : typeof error.code === "string" && error.code.startsWith("LIMIT_")
      ? 400
      : Number.isInteger(error.statusCode) &&
        error.statusCode >= 400 &&
        error.statusCode < 600
      ? error.statusCode
      : Number.isInteger(error.status) &&
        error.status >= 400 &&
        error.status < 600
      ? error.status
      : 500;
  const message =
    statusCode >= 500
      ? "Internal server error"
      : error.code === 11000
      ? "A record with that value already exists"
      : error.message;

  const uploadedFiles = [
    _req.file,
    ...Object.values(_req.files || {}).flat(),
  ].filter((file) => file?.path);

  Promise.all(
    uploadedFiles.map((file) =>
      fs.rm(file.path, { force: true }).catch((cleanupError) => {
        console.error("Temporary upload cleanup failed:", cleanupError.message);
      })
    )
  ).then(() => {
    if (statusCode >= 500) {
      console.error("API request failed:", error.message);
    }

    res.status(statusCode).json({
      statusCode,
      success: false,
      message,
      errors: error.errors || [],
    });
  });
});

export { app };
