import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const authorization = req.header("Authorization");
  const token =
    req.cookies?.accessToken ||
    (authorization?.startsWith("Bearer ") ? authorization.slice(7) : null);

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decodedToken;
  try {
    decodedToken = verifyAccessToken(token);
  } catch (_error) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  next();
});
