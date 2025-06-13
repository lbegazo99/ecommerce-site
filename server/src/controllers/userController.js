const { redirect } = require('express/lib/response');
const db = require ('../db/insert')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
async function CreateNewUser(req,res){
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const customer_id = await db.insertNewUser(
            req.body.userName,
            req.body.email,
            hashedPassword,
            req.body.firstName,
            req.body.lastName,
        );



        const token = jwt.sign(
            {
                userId: customer_id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({ message: "User created", token });
    }catch(err){
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {CreateNewUser}