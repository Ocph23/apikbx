const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const middleware = {};


middleware.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.token_secret, (err, user) => {
            if (!err) {
                req.user = user
                next()
            }else{
                return res.status(401).json({ message: "anda tidak memmiliki akses !", error: err });
            }
        })
    }else{
        return res.status(401).json({ message: "anda tidak memmiliki akses !" });
    }
}

module.exports = middleware;