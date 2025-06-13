const pool = require("./pool");

async function insertNewUser(userName,email,password,firstName,lastName){

  const result = await pool.query(
        `INSERT INTO customer (email,user_name,password, firstname, lastname,loyalty_points) VALUES ($1, $2, $3, $4, $5,$6)
         RETURNING customer_id`,
        [email,userName, password, firstName, lastName,0]
      );
      
      return result.rows[0].customer_id;
}

module.exports = {insertNewUser}