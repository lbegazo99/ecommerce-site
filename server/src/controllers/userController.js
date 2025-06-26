const { redirect } = require('express/lib/response');
const db = require ('../db/insert')
const db2 = require('../db/queries')
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
                customer_id: customer_id
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

async function addToCart(req,res){
    const customer_id = req.user.customer_id;
    const{product_id,quantity} = req.body;
    console.log(product_id)
    console.log(quantity)
    try {
        await db2.addToCart(customer_id,product_id,quantity)
    } catch (err) {
        console.error("Error in addToCart:",err)
        res.status(500).json({error:"Failed to add item to cart"});
    }
}

async function getCart(req,res){
    const customer_id = req.user.customer_id
    try{
       const cart =  await db2.getCart(customer_id)
       res.json(cart)
    }catch(err){
        console.error("Error in getting cart",err)
        res.status(500).json({error:"Failed to get cart"});
    }
}

module.exports = {CreateNewUser,addToCart,getCart}