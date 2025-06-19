const pool = require("./pool");

async function getTeamNBAJerseys(team_name) {
    const result = await pool.query(`
    SELECT *
    FROM product
    Join jersey ON p_id = product_id
    WHERE jersey.team = $1
  `,[team_name]);

    return result.rows;
}

async function getNbaPlayerJersey(player_name){
    const result = await pool.query(`
    SELECT * 
    FROM product
    Join jersey on p_id = product_id
    WHERE jersey.player = $1
    `,[player_name]);

    return result.rows;
}

async function getAllNBAProducts(){
    const result = await pool.query(`
        SELECT *
        FROM product
        Join jersey on p_id = product_id
        WHERE league = 'NBA'
    `)

    return result.rows;
}

async function getAllProductsNames(value){
    const result = await pool.query(`
        SELECT product_description
        FROM product
        WHERE product_description ILIKE $1
    `,[`%${value}%`])

    return result.rows
}

async function getAllNBATeams(){
    const result = await pool.query(`
        SELECT DISTINCT team
        FROM Jersey
        WHERE league = 'NBA'
         `
    )

    return result.rows;
}


module.exports ={
    getTeamNBAJerseys,
    getNbaPlayerJersey,
    getAllNBAProducts,
    getAllProductsNames,
    getAllNBATeams
}