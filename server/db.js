const Pool = require("pg").Pool;
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
    user: 'postgres',
    password: 'V0lenters!',
    host: 'localhost',
    port: 5432,
    database: "propertymanagement"
})

module.exports = pool;
