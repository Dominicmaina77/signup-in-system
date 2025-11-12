const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
    try{
        // destructure the request body(name,email,password)
          const {name,email,password}=req.body;
        // check if the user does exist(if not throw error)
          const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

          if(user.rows.length !== 0){
              return res.status(401).json("user already exists");
          }
        // hash the password
         const saltRound = 10;
         const salt = await bcrypt.genSalt(saltRound);
         const bcryptPassword = await bcrypt.hash(password,salt);

          res.json(user.rows)


        // enter user in the db
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *", [name,email,bcryptPassword]);
        res.json(newUser);
        // generate jwt token
      

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
})




module.exports = router;





