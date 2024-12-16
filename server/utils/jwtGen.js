const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id, user_type) {
    const payload = {
        user: {
            id: user_id,
            type: user_type
        }
    };
    //console.log(user_id);
    return jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "24hr"});
}

module.exports = jwtGenerator;
