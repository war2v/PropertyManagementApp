const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req,res,next) => {
    switch(req.path){
        case "/is-verify-owner":
            try {
                const jwtToken = req.header("token");
                //console.log(req.header("token"));
                if (!jwtToken) {
                    return res.status(403).json("Not Authorized");
                }
                const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
                //console.log(payload.user);
                if (payload.user.type !== 'O'){
                    return res.status(403).json("Not Authorized");
                }
                req.user = payload.user;
        
            } catch (err) {
                console.error(err.message)
                return res.status(403).json("Not Authorized")
            }
            break;
        case "/is-verify-manager":
            try {
                const jwtToken = req.header("token");
                //console.log(req.header("token"));
                if (!jwtToken) {
                    return res.status(403).json("Not Authorized");
                }
                const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
                //console.log(payload.user);
                if (payload.user.type !== 'M'){
                    return res.status(403).json("Not Authorized");
                }
                req.user = payload.user;
        
            } catch (err) {
                console.error(err.message)
                return res.status(403).json("Not Authorized")
            }
            break;
        case "/is-verify-tenant":
            try {
                const jwtToken = req.header("token");
                //console.log(req.header("token"));
                if (!jwtToken) {
                    return res.status(403).json("Not Authorized");
                }
                const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
                //console.log(payload.user);
                if (payload.user.type !== 'T'){
                    return res.status(403).json("Not Authorized");
                }
                req.user = payload.user;
        
            } catch (err) {
                console.error(err.message)
                return res.status(403).json("Not Authorized")
            }
            break;
        
    }
    next();
};