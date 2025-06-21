const errorHandler = (err, req, res, next) => {
  // Normalize error object
  const errorMessage =
    typeof err === "string" ? err : err?.message || "Server Error";

  const errorStack =
    typeof err === "object" && err?.stack
      ? err.stack
      : new Error(errorMessage).stack;

  console.error("Error Handler:");
  console.error("Message:", errorMessage);
  console.error(
    "Stack:",
    process.env.NODE_ENV === "production" ? "HIDDEN" : errorStack
  );

  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // CORS error
  if (errorMessage === "Not allowed by CORS") {
    statusCode = 403;
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : errorStack,
  });
};

export default errorHandler;
