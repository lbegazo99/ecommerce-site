const { json } = require("express/lib/response");
const db = require("../db/queries");

async function getTeamNBAJersey(req,res){
    try{
        const jerseys = await db.getTeamNBAJersey(req.params.teamName);
        res.json(jerseys);
    }catch(err){
        console.error("Error fetching jerseys",err)
        res.status(500).json({error:"Internal server error"});
    }
}

async function getNbaPlayerJersey(req,res){
    try{
        const jerseys = await db.getNbaPlayerJersey(req.params.playerName);
        res.json(jerseys);
    }catch(err){
        console.error("Error fetching jerseys",err)
        res.status(500).json({error:"Internal server error"});
    }
}

async function getAllProducts(req,res){
    try{
        const products = await db.getAllNBAProducts();
        res.json(products);
    }catch(err){
        console.error("error fetching products",err)
        res.status(500).json({error:"Internal server error"});
    }
}

async function getAllProductsDescriptions(req,res){
    try{
        const names = await db.getAllProductsNames(req.params.value);
        res.json(names);
    }catch(err){
        console.error("error fetching products",err)
        res.status(500).json({error:"Internal server error"});
    }
}

async function getProduct(req,res){
    try{
        const product = await db.getProduct(req.params.productId);
        res.json(product);
    }catch(err){
        console.error("error fetching products",err)
        res.status(500).json({error:"Internal server error"});
    }
}



module.exports = {getTeamNBAJersey,getNbaPlayerJersey,getAllProducts,getAllProductsDescriptions,getProduct}