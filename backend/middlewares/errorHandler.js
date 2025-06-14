const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // CORS error
  if (err.message === "Not allowed by CORS") {
    statusCode = 403;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
