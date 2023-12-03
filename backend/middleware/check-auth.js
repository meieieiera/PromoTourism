const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token:", token); 
        jwt.verify(token, "this_secret");
        next();
    } catch (error) {
        console.log("Authentication failed:", error); 
        res.status(401).json({
            message: "Authentication failed"
        });
    }
};
