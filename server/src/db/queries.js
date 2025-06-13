const pool = require("./pool");

async function getTeamNBAJerseys(req,res,team_name) {
    const result = await pool.query(`
    SELECT *
    FROM product
    Join jersey ON p_id = product_id
    WHERE jersey.team = $1
  `,[team_name]);

    return result.rows;
}

async function getNbaPlayerJersey(req,req,player_name){
    const result = await pool.query(`
    SELECT * 
    FROM product
    Join jersey on p_id = product
    WHERE jersey.player = $1
    `,[player_name]);

    return result.rows;
}




module.exports ={
    getNbaPlayerJersey,
    getNbaPlayerJersey
}