// const jwt = require('jsonwebtoken');

// const ensureAuthenticated = (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Unauthorized, no token" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded user:", decoded);
//     req.user = decoded;
//     next();
// } catch (error) {
//     console.log("TOKEN ERROR:", error.message);
//     return res.status(403).json({
//         message: "Unauthorized, token invalid or expired"
//     });
// }
// };

// module.exports = ensureAuthenticated;

const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  let token = null;

  // 1️⃣ Check Authorization header
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2️⃣ Check cookie if no header token
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded user:", decoded);
    next();
  } catch (error) {
    console.log("TOKEN ERROR:", error.message);
    return res.status(403).json({
      message: "Unauthorized, token invalid or expired",
    });
  }
};

module.exports = ensureAuthenticated;