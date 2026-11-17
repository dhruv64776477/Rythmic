import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SIGNING_SECRET,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_SIGNING_SECRET,
  REFRESH_TOKEN_TTL,
} from "../constants.js";

export const createAccessToken = (payload) =>
  jwt.sign(payload, ACCESS_TOKEN_SIGNING_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });

export const createRefreshToken = (userId) =>
  jwt.sign({ _id: userId }, REFRESH_TOKEN_SIGNING_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });

export const verifyAccessToken = (token) =>
  jwt.verify(token, ACCESS_TOKEN_SIGNING_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, REFRESH_TOKEN_SIGNING_SECRET);

export const createToken = async (username, id) =>
  createAccessToken({ _id: id, username });

export const verifyToken = async (token) => {
  try {
    const decoded = verifyAccessToken(token);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};
