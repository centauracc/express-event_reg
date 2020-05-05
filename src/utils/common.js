const validateJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("JSON content required");
  } else {
    next();
  }
};

module.exports = { validateJsonContent };
