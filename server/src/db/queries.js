const pool = require("./pool");

async function getTeamNBAJersey(team_name) {
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
        SELECT *
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

async function getProduct(productId){
    const result = await pool.query(`
        SELECT *
        FROM Product
        WHERE product_id = $1
    `,[productId])
    
    return result.rows;
}

async function addToCart(customer_id,product_id,quantity){
    await pool.query(`
        INSERT INTO cart(customer_id,product_id,quantity)
        VALUES($1,$2,$3)
        ON CONFLICT (customer_id,product_id)
        DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    `,[customer_id,product_id,quantity]);
}

async function getCart(customer_id){
   const result =  await pool.query(`
        SELECT product.product_description, product.price , cart.quantity, product.thumbnail,product.product_id
        FROM cart
        JOIN product ON cart.product_id = product.product_id
        WHERE cart.customer_id = $1
    `,[customer_id])

    console.log(result.rows);
    return result.rows
}

async function checkout(product_id,customer_id,timestamp){
    await pool.query(`
        INSERT INTO orderedItems(customer_id,product_id,timestamp)
        VALUES($1,$2,$3)
    `,[customer_id,product_id,timestamp]);

    await pool.query(`
        DELETE
        FROM cart
        WHERE customer_id = $1
    `,[customer_id])
}

module.exports = {
    getTeamNBAJersey,
    getNbaPlayerJersey,
    getAllNBAProducts,
    getAllProductsNames,
    getAllNBATeams,
    getProduct,
    addToCart,
    getCart,
    checkout
}