const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES
//Create a user

app.post("/users", async (req, res) => {
try {
    const { username, email } = req.body;
    const newUser = await pool.query("INSERT INTO users(username, email) VALUES($1, $2) RETURNING *", [username, email]);
    res.status(200).send(`${username}, ${email}`);
} catch (err) {
    console.log(err);
}
});




//Get all users

app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err);
    }
});

//Get A user
app.post("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
        res.status(200).send(`${user.rows[0]}`);
        console.log(user);
    } catch (err) {
        console.log(err);
    }
    }); 

//Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        const updateUser =  await pool.query("UPDATE users SET username = $1 WHERE id = $2", 
            [username, id]);
        console.log("user updated");

        
    } catch (err) {
        console.error(err)
    }
});

//Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser =  await pool.query("DELETE FROM users WHERE id = $1", 
            [id]);
        console.log("user deleted");

        
    } catch (err) {
        console.error(err)
    }
});

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
});