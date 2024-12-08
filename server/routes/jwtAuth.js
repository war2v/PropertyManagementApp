const router = require('express').Router();
const bcrypt = require('bcrypt')
const pool = require("../db");
const jwtGen = require("../utils/jwtGen");
const jwtGenerator = require('../utils/jwtGen');
const validInfo = require("../middleware/ValidInfo")
const authorization = require("../middleware/Authorization")

router.post("/register", validInfo, async (req, res) => {
    try {

        // destructure request body
        const { username, email, password } = req.body;

        //console.log(email);

        // test if email in use
        let user = await pool.query("SELECT * FROM users WHERE email=$1", 
           [email]);

        if (user.rows.length !== 0) {
            res.status(401).send("Email already in use.")
        } else {

            user = await pool.query("SELECT * FROM users WHERE username=$1", 
                [username]);
            
            if (user.rows.length !== 0) {
                res.status(401).send("Username already in use.")
            } else {

                // encrpyt password
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const bcryptPassword = await bcrypt.hash(password, salt);

                // add user to database
                const newUser = await pool.query(
                    "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *", 
                    [username, email, bcryptPassword]);

                const token = jwtGenerator(newUser.rows[0].id);
                //console.log(newUser.rows[0].id);
                res.json({token});
            
            }
        }
        //res.status(200).send(`${username}, ${email}, ${password}`);
    } catch (err) {
        //log server error
        console.log(err);
        res.status(500).send("Server Error")
    }
});

//Tenant Register
router.post("/tenant-registration", validInfo, async (req, res) => {
    try {

        // destructure request body
        const { username, email, password } = req.body;
        //console.log(username);

        //console.log(email);

        // test if email in use
        let user = await pool.query("SELECT username FROM tenants WHERE email=$1", 
           [email]);

        if (user.rows.length !== 0) {
            res.status(401).send("Email already in use.")
        } else { 

            user = await pool.query("SELECT username FROM tenants WHERE username=$1", 
                [username]);
            
            if (user.rows.length !== 0) {
                res.status(401).send("Username already in use.")
            } else {

                // encrpyt password
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const bcryptPassword = await bcrypt.hash(password, salt);

                // add user to database
                const newUser = await pool.query(
                    "INSERT INTO tenants(username, email, _password) VALUES($1, $2, $3) RETURNING *", 
                    [username, email, bcryptPassword]);
                
                res.status(200).send("Tenant Account Created");
            
            }
        }
        
        //res.status(200).send(`${username}, ${email}, ${password}`);
    } catch (err) {
        //log server error
        console.log(err);
        res.status(500).send("Server Error")
    }
});

//Owner Registration
router.post("/owner-registration", validInfo, async (req, res) => {
    try {

        // destructure request body
        const { username, email, password } = req.body;
        //console.log(username);

        //console.log(email);

        // test if email in use
        let user = await pool.query("SELECT username FROM owners WHERE email=$1", 
           [email]);

        if (user.rows.length !== 0) {
            res.status(401).send("Email already in use.")
        } else { 

            user = await pool.query("SELECT username FROM owners WHERE username=$1", 
                [username]);
            
            if (user.rows.length !== 0) {
                res.status(401).send("Username already in use.")
            } else {

                // encrpyt password
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const bcryptPassword = await bcrypt.hash(password, salt);

                // add user to database
                const newUser = await pool.query(
                    "INSERT INTO owners(username, email, _password) VALUES($1, $2, $3) RETURNING *", 
                    [username, email, bcryptPassword]);
                
                res.status(200).send("Owner Account Created");
            
            }
        }
        
        //res.status(200).send(`${username}, ${email}, ${password}`);
    } catch (err) {
        //log server error
        console.log(err);
        res.status(500).send("Server Error")
    }
});


//Tenant Register
router.post("/manager-registration", validInfo, async (req, res) => {
    try {

        // destructure request body
        const { username, email, password } = req.body;
        //console.log(username);

        //console.log(email);

        // test if email in use
        let user = await pool.query("SELECT username FROM managers WHERE email=$1", 
           [email]);

        if (user.rows.length !== 0) {
            res.status(401).send("Email already in use.")
        } else { 

            user = await pool.query("SELECT username FROM managers WHERE username=$1", 
                [username]);
            
            if (user.rows.length !== 0) {
                res.status(401).send("Username already in use.")
            } else {

                // encrpyt password
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const bcryptPassword = await bcrypt.hash(password, salt);

                // add user to database
                const newUser = await pool.query(
                    "INSERT INTO managers(username, email, _password) VALUES($1, $2, $3) RETURNING *", 
                    [username, email, bcryptPassword]);
                
                res.status(200).send("Manager Account Created");
            
            }
        }
        
        //res.status(200).send(`${username}, ${email}, ${password}`);
    } catch (err) {
        //log server error
        console.log(err);
        res.status(500).send("Server Error")
    }
});

// Routes
// Owner Login
router.post("/owner-login", validInfo, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query("SELECT * FROM owners WHERE username=$1",
            [username]);
        if (user.rows.length === 0) {
            const email = await pool.query("SELECT * FROM tenants WHERE email=$1",
                [username]);
            if (email.rows.length === 0) {
                res.status(401).json("Username, Email or Password is incorrect")
            } else {
                const validPassword = await bcrypt.compare(password, user.rows[0]._password);
                if (!validPassword) {
                    return res.status(401).json("Username, Email or Password is incorrect");
                }
                const token = jwtGenerator(user.rows[0].id);
                //console.log(token);
                res.json({token});
            }
        }else {
            const validPassword = await bcrypt.compare(password, user.rows[0]._password);
            if (!validPassword) {
                return res.status(401).json("Username, Email or Password is incorrect");
            }
            const token = jwtGenerator(user.rows[0].id);
            //console.log(token);
            res.json({token});
        }
        
    } catch (err) {
        console.log(err)
    }
    


});

// Tenant Login
router.post("/tenant-login", validInfo, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query("SELECT * FROM tenants WHERE username=$1",
            [username]);
        if (user.rows.length === 0) {
            const email = await pool.query("SELECT * FROM tenants WHERE email=$1",
                [username]);
            if (email.rows.length === 0) {
                res.status(401).json("Username, Email or Password is incorrect")
            } else {
                const validPassword = await bcrypt.compare(password, user.rows[0]._password);
                if (!validPassword) {
                    return res.status(401).json("Username, Email or Password is incorrect");
                }
                const token = jwtGenerator(user.rows[0].id);
                //console.log(token);
                res.json({token});
            }        
        } else {
            const validPassword = await bcrypt.compare(password, user.rows[0]._password);
            if (!validPassword) {
                return res.status(401).json("Username, Email or Password is incorrect");
            }
            const token = jwtGenerator(user.rows[0].id);
            //console.log(token);
            res.json({token});
        }
        
    } catch (err) {
        console.log(err)
    }
    

});

// Manager Login
router.post("/manager-login", validInfo, async (req, res) => {
    try {
        const { username, password } = req.body;
        //console.log(password);
        const user = await pool.query("SELECT * FROM managers WHERE username=$1",
            [username]);
        if (user.rows.length === 0) {
            const email = await pool.query("SELECT * FROM tenants WHERE email=$1",
                [username]);
            if (email.rows.length === 0) {
                res.status(401).json("Username, Email or Password is incorrect")
            } else {
                const validPassword = await bcrypt.compare(password, email.rows[0]._password);
                if (!validPassword) {
                    return res.status(401).json("Username, Email or Password is incorrect");
                }
                const token = jwtGenerator(email.rows[0].id);
                //console.log(token);
                res.json({token});
            }  
        } else { 
            //console.log(user.rows.length);
            const validPassword = await bcrypt.compare(password, user.rows[0]._password);
            if (!validPassword) {
                return res.status(401).json("Username, Email or Password is incorrect");
            }
            const token = jwtGenerator(user.rows[0].id);
            console.log(user);
            res.json({token});
        }
        
    } catch (err) {
        console.log(err)
    }
    

});





router.post("/login", validInfo, async (req, res) => {
    try {

        // destructure request body
        const { username, password } = req.body;

        // test if user exists

        const user = await pool.query("SELECT * FROM users WHERE username=$1", 
            [username]);
        if (user.rows.length === 0) {
            res.status(401).json("Username or Password is incorrect");
        } 

        // compare password with database password
        //console.log(password);
        //console.log(user.rows[0].password)
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Username or Password incorrect");
        }

        const token = jwtGenerator(user.rows[0].id);
        console.log(token);
        res.json({token}); 
        //res.status(200).send(`${username}, ${email}, ${password}`);
    } catch (err) {
        //log server error
        console.log(err);
        res.status(500).send("Server Error")
    }
    });


router.post("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }

});

module.exports = router;