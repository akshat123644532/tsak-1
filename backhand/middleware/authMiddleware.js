const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "token is wrong"
        });
    }
};

module.exports = authMiddleware;