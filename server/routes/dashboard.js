const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/Authorization")

router.get("/properties", authorization, async(req, res) => {
    try {
        const portfolio = await pool.query("SELECT * FROM portfolios WHERE owner_id_1 = $1", [req.user.id]);
        console.log(portfolio);
        //res.json(properties.rows[0])
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/owner-username", authorization, async(req,res) =>{
    try {
        const owner = await pool.query("SELECT username FROM owners WHERE id = $1", [req.user.id]);
        res.json(owner.rows[0]);
    } catch (err) {
        console.log(err)
    }
});

router.post("/create-portfolio", authorization, async(req, res) => {
    try {
        const {name, owner1, owner2, owner3, owner4, owner5} = req.body;
        const owner_1 = await pool.query("SELECT * FROM owners WHERE email=$1",
            [owner1]
        );
        console.log(owner_1.rows[0].id)

        const p_exists = pool.query("SELECT * FROM portfolios WHERE p_name=$1",
            [name]
        )

        if (p_exists.rows.length !== 0) {
            res.json("Name in use");
        } 
        const portfolio = pool.query("INSERT INTO portfolios(p_name, owner_id_1) VALUES($1, $2)",
                [name, owner_1.rows[0].id]
            );
        
    } catch (err) {
        console.log(err)
    }
});

router.post("/create-property", authorization, async(req, res) => {
    try {
        const {address, city, state, zip, country, property_type, property_style, bedrooms, bathrooms, square_feet, lot_size, year_built, market_value, purchase_date, description} = req.body;
        console.log(address, city, state, zip, country, property_type, bedrooms, bathrooms, square_feet, lot_size, year_built, market_value, purchase_date, description);
        const portfolio = pool.query("SELECT id FROM portfolios WHERE owner_id_1=$1",
            [req.user.id]
        );
        
        const property = pool.query("INSERT INTO properties(portfolio_id, _address, city, _state, zip, country, property_type, property_style, bedrooms, bathrooms, square_feet, lot_size, year_build, market_value, purchase_date, _status, _description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *", 
            [portfolio, address, city, state, zip, country, property_type, property_style, bedrooms, bathrooms, square_feet, lot_size, year_built, market_value, purchase_date, _status="Acitve", description]
        );
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
