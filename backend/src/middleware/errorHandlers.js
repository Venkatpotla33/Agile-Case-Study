export const notFoundHandler = (_req, res, _next) => {
  res.status(404).json({
    message: "Resource not found",
  });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  console.error("API error:", err);

  const status = err.statusCode || 500;
  const message =
    err.message || "An unexpected error occurred. Please try again later.";

  res.status(status).json({
    message,
    ...(err.details ? { details: err.details } : {}),
  });
};

