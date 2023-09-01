const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


var connection = require("./database");

router.post("/login", (req, res) => {
    var data = req.body;
    var loginRequest = req.body;
    var passwordHash = crypto.createHash("md5").update(loginRequest.password).digest("hex");
    connection.query(
        "SELECT * FROM user where username=? and passwordhash=?", [loginRequest.username, passwordHash],
        function (err, rows) {
            if (!err) {
                var user = rows[0];
                if (user) {
                    var authresponse = {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        active: user.active,
                    }
                    authresponse.token = generateAccessToken(authresponse);
                    return res.send(authresponse);
                }
            }
            return res.status(401).json({ message: "anda tidak memmiliki akses !", error: err });
        }
    );
});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.token_secret, { expiresIn: '1d' });
}

module.exports = router;