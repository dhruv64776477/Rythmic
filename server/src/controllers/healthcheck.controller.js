import { ApiResponse } from "../utils/ApiResponse.js";

export const healthcheck = async (_, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "ok",
        service: "rythmic-server",
        uptime: process.uptime(),
      },
      "Server is healthy"
    )
  );
};
