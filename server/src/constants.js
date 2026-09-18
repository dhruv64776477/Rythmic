import dotenv from "dotenv";
dotenv.config();

export const {
  PORT = 5000,
  DATABASE_URL,
  JWT_SECRET,
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
