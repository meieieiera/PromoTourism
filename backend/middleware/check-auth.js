const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token:", token); // Add this line for debugging
        jwt.verify(token, "this_secret");
        next();
    } catch (error) {
        console.log("Authentication failed:", error); // Add this line for debugging
        res.status(401).json({
            message: "Authentication failed"
        });
    }
};
