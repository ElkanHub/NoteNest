class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
// This code defines a custom error class for handling errors in a Node.js application.
// The CustomError class extends the built-in Error class and includes a statusCode property.
// This allows for more specific error handling and response formatting in the application.