const {Router} = require("express");
const { CreateNewUser } = require("../controllers/userController");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const userRouter = Router();
const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

userRouter.post("/sign-up",CreateNewUser);

userRouter.post("/log-in", async (req,res) =>{
  const {username,password} = req.body;

  try{
    const result = await pool.query(
      `SELECT * FROM customer WHERE user_name = $1`,
      [username]
    );
    
    const user = result.rows[0];

    if(!user){
      return res.status(401).json({error: 'User not found'});
    }

    const passwordMatch = await bcrypt.compare(password,user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const token = jwt.sign(
      { userId: user.customer_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });

  }catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})


userRouter.get("/log-out", (req, res) => {
  // On frontend, you should just clear the token
  res.json({ message: "Logout successful – please delete token on client" });
});


function verifyToken(req,res,next){
  const bearerheader = req.headers['authorization'];
  if(typeof bearerheader !== 'undefined'){
    const token = bearerheader.split(' ')[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
      if(err){
        return res.sendStatus(403);
      }
      req.user = decoded
      next();
    })
  }else{
    res.sendStatus(403);
  }
}

module.exports = userRouter;