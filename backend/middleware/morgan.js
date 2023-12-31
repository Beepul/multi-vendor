const morgan = require("morgan");
const logger = require("./logger");


// const errorLogger = (message) => {
//   morgan.token('error', (req,res) => {
//     return message
//   })
// }

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms`;
// const errorResponseFormat = `:method :url :status - :response-time ms - message: :error`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
  // errorLogger
};