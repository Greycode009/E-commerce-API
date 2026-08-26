class AppError extends Error {
  constructor(message, statusCode, error = null) {
    super(message);

    this.statusCode = statusCode;
    this.errors = error;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
