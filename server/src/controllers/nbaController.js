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



module.exports = {getTeamNBAJersey,getNbaPlayerJersey}