const router = require("express").Router();
const pool = require("../db");
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

        // enter user in the db

        // generate jwt token
      

    } catch (err) {
        console.log(err);
        res.status
    }
})




module.exports = router;





