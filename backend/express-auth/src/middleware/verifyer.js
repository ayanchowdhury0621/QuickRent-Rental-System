const admin = require("../config/firebase-auth_server");

class Middleware {
  async decodeToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodeValue = await admin.auth().verifyIdToken(token);
      console.log("Decoded Value", decodeValue);
      if (decodeValue?.code != "auth/argument-error") {
        // console.log("Running next");
        // return next();
        return res.json({ message: "success", type: "authentication" });
      }

      return res.status(401).json({ message: "Unauthorized (Sign-in again)", type: "authentication" })
    }
    catch (error) {
      return res.status(500).json({ message: "Internal Server Error", type: "authentication" });
    }

  }
}


module.exports = new Middleware();