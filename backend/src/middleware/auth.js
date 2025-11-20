import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/token.js";
import User from "../models/User.js";

export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication token missing");
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.sub).lean();
    if (!user) {
      throw new ApiError(401, "User not found for provided token");
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(new ApiError(401, "Session expired. Please log in again."));
    } else if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(401, "Invalid authentication token"));
    }
  }
};

export const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, "Forbidden"));
  }

  return next();
};

