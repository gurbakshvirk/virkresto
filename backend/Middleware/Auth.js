const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user:", decoded);
    req.user = decoded;
    next();
} catch (error) {
    console.log("TOKEN ERROR:", error.message);
    return res.status(403).json({
        message: "Unauthorized, token invalid or expired"
    });
}
};

module.exports = ensureAuthenticated;