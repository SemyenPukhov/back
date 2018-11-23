const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // console.log("token in check-auth", req.body.token);
    console.log("START AUTH");
    const decoded = jwt.verify(req.body.token, "secret");
    req.body.userData = decoded;
    console.log("Success AUTH");
    next();
  } catch (err) {
    return res.status(401).json({
      message: "LOG_OUT",
    });
  }
}