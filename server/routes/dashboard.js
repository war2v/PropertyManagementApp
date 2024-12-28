const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/Authorization")
const jwt = require("jsonwebtoken");

router.get("/properties", authorization, async(req, res) => {
    try {
        const p_name = req.header("p_name");
        const jwtToken = req.header("token");
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
        const portfolio = await pool.query("SELECT id FROM portfolios WHERE p_name = $1", [p_name]);
        console.log(portfolio.rows[0].id);
        const property = await pool.query("SELECT * FROM properties WHERE portfolio_id = $1", [portfolio.rows[0].id]);
        console.log(property.rows[0]);
        res.json(property.rows);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/owner-username", authorization, async(req,res) =>{
    try {
        const jwtToken = req.header("token");
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
        req.user = payload.user;
        //console.log(req.user)

        const owner = await pool.query("SELECT username FROM owners WHERE id = $1", [req.user.id]);
        res.json(owner.rows[0]);
    } catch (err) {
        console.log(err)
    }
});

router.get("/owner-portfolios", authorization, async(req,res) =>{
    try {
        const jwtToken = req.header("token");
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
        req.user = payload.user;
        //console.log(req.user)

        const owner = await pool.query("SELECT * FROM portfolios WHERE owner_id_1 = $1", [req.user.id]);
        res.json(owner.rows);
    } catch (err) {
        console.log(err)
    }
});


router.get("/create-portfolio", authorization, async(req, res) => {
    try {
        const jwtToken = req.header("token");
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
        req.user = payload.user;
        //console.log(req.user)
        const owner = await pool.query("SELECT email FROM owners WHERE id = $1", [req.user.id]);
        res.json((owner.rows[0]));

        
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

        if (p_exists.rows === 0) {
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
        const {p_name, address, city, state, zip, country, propertyType, propertyStyle, bedrooms, bathrooms, squareFt, lotSize, yearBuild, marketValue, purchaseDate, description} = req.body;
        console.log(address, city, state, zip, country, propertyType, bedrooms, bathrooms, squareFt, lotSize, yearBuild, marketValue, purchaseDate, description);
        const portfolio = await pool.query("SELECT id FROM portfolios WHERE p_name=$1",
            [p_name]
        );
        console.log(portfolio.rows[0].id);
        
        const property = await pool.query("INSERT INTO properties(portfolio_id, _address, city, _state, zip, country, property_type, property_style, bedrooms, bathrooms, square_feet, lot_size, year_build, market_value, purchase_date, _status, _description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *", 
            [portfolio.rows[0].id, address, city, state, zip, country, propertyType, propertyStyle, bedrooms, bathrooms, squareFt, lotSize, yearBuild, marketValue, purchaseDate, _status="Acitve", description]
        );
        
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
