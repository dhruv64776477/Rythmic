import dotenv from "dotenv";
import { createHmac } from "node:crypto";

dotenv.config();

export const {
  PORT = 5000,
  DATABASE_URL,
  MONGODB_URI,
  JWT_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  JWT_ALGORITHM,
  JWT_EXPIRATION,
  NODE_ENV = "development",
  FRONTEND_URL = "http://localhost:5173",
} = process.env;

export const IS_PRODUCTION = NODE_ENV === "production";
export const JWT_EXPIRES_IN = JWT_EXPIRATION || "1d";
export const DB_NAME = process.env.DB_NAME || "rythmic";
const deriveTokenSecret = (secret, purpose) =>
  secret ||
  (JWT_SECRET
    ? createHmac("sha256", JWT_SECRET)
        .update(`rythmic:${purpose}`)
        .digest("hex")
    : undefined);

export const ACCESS_TOKEN_SIGNING_SECRET = deriveTokenSecret(
  ACCESS_TOKEN_SECRET,
  "access-token"
);
export const REFRESH_TOKEN_SIGNING_SECRET = deriveTokenSecret(
  REFRESH_TOKEN_SECRET,
  "refresh-token"
);
export const ACCESS_TOKEN_TTL = ACCESS_TOKEN_EXPIRY || "15m";
export const REFRESH_TOKEN_TTL = REFRESH_TOKEN_EXPIRY || "7d";

export const privateKey = process.env.JWT_PRIVATE_KEY
  ? Buffer.from(process.env.JWT_PRIVATE_KEY, "base64").toString("utf8")
  : "";
export const publicKey = process.env.JWT_PUBLIC_KEY
  ? Buffer.from(process.env.JWT_PUBLIC_KEY, "base64").toString("utf8")
  : "";

export const env = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  ACCESS_TOKEN_SIGNING_SECRET,
  REFRESH_TOKEN_SIGNING_SECRET,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  JWT_ALGORITHM,
  JWT_EXPIRATION,
  JWT_EXPIRES_IN,
  DB_NAME,
  NODE_ENV,
  IS_PRODUCTION,
  privateKey,
  publicKey,
  ...process.env,
};

export default env;
