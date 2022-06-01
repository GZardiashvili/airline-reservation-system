function errorHandler(err, req, res) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: 'Invalid Token',
    });
  } else {
    res.status(400).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
}

module.exports = errorHandler;
