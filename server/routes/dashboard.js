const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/Authorization")

router.get("/", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT username FROM users WHERE id = $1", [req.user.id]);
        res.json(user.rows[0])
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;
