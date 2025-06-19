const db = require("../db/queries");

async function getAllNBATeams(req,res){
    try{
        const teams = await db.getAllNBATeams()
        res.json(teams);
    }catch(err){
        console.error("error fetching team names",err);
        res.status(500).json({error:"Internal server error"});
    }
}


module.exports = {getAllNBATeams};