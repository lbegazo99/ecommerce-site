require("dotenv").config();
const pool = require('./pool'); 
console.log("🚀 Populating database:", process.env.DB_NAME);

const insertMoreItems = `
  INSERT INTO Product (price, product_description, thumbnail, quantity)
  VALUES 
    (325.00, 'Shaquille ONeal Purple Los Angeles Lakers 2000 NBA All-Star Jersey','/images/ShaqLakers2000AllStar.avif', 5),
    (300.00, 'Shaquille ONeal Purple Los Angeles Lakers 2001/02 HardWood Classics Authentic Jersey','/images/ShaqLakersPurple2001HardWoodClassics.avif', 5),
    (300.00, 'Magic Johnson Gold Los Angeles Lakers 1984/85 HardWood Classics Authentic Jersey', '/images/MagicJohnsonGold1984Jersey.avif', 5),
    (300.00, 'Magic Johnson Purple Los Angeles Lakers 1984/85 Authentic Jersey','/images/MagicJohnsonPurple1984Jersey.avif', 5),
    (135.00, 'Michael Cooper Gold Los Angeles Lakers 1984/85 Swingman Jersey','/images/MichaelCooperGold1984Jersey.avif', 5),
    (135.00, 'Shaquille ONeal Blue Los Angeles Lakers 2001/02 HardWood Classics Swingman Jersey','/images/ShaqBlue2001Jersey.avif', 5),
    (135.00, 'Pau Gasol Purple Los Angeles Lakers 2009/10 Swingman Jersey','/images/PauGasolPurple09Jersey.avif', 5)
  ON CONFLICT DO NOTHING;

  INSERT INTO Jersey (p_id, league, team, player, year)
  VALUES
    (4, 'NBA', 'Lakers', 'Shaquille ONeal', '2000'),
    (5, 'NBA', 'Lakers', 'Shaquille ONeal', '2001'),
    (6, 'NBA', 'Lakers', 'Magic Johnson', '1984'),
    (7, 'NBA', 'Lakers', 'Magic Johnson', '1984'),
    (8, 'NBA', 'Lakers', 'Michael Cooper', '1984'),
    (9, 'NBA', 'Lakers', 'Shaquille ONeal', '2001'),
    (10, 'NBA', 'Lakers', 'Pau Gasol', '2009')
  ON CONFLICT DO NOTHING;
`;


const createShoppingCartTable = `
  CREATE TABLE IF NOT EXISTS cart(
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,

    PRIMARY KEY (customer_id,product_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
  )
`;

const createCustomerTable = `
CREATE TABLE IF NOT EXISTS Customer (
  customer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT,
  user_name VARCHAR(255),
  password VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  loyalty_points INTEGER
);

CREATE TABLE IF NOT EXISTS Address (
  address_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  street VARCHAR(15),
  zipcode VARCHAR(5),
  city VARCHAR(15),
  state VARCHAR(2),
  FOREIGN KEY (user_id) REFERENCES Customer(customer_id)
);
`;

const creatAndInitializeProductTable = `
  CREATE TABLE IF NOT EXISTS Product (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    price DECIMAL(6,2),
    product_description TEXT,
    thumbnail TEXT,
    quantity INTEGER
  );

  INSERT INTO Product (price, product_description, thumbnail, quantity)
  VALUES 
    (299.99, 'Wilt Chamberlain 1972 Los Angeles Lakers Jersey', '/images/WiltChamberlainJersey.avif', 5),
    (299.99, 'Kevin Garnett 2003 Minnesota Timberwolves Jersey', '/images/GarnettTimberWolves.avif', 5),
    (135.99, 'Carmelo Anthony 2003 Denver Nuggets Jersey', '/images/MeloPowderBlue.avif', 5)
  ON CONFLICT DO NOTHING;

  CREATE TABLE IF NOT EXISTS Jersey (
    p_id INTEGER PRIMARY KEY,
    league VARCHAR(10),
    team VARCHAR(20),
    player VARCHAR(30),
    year VARCHAR(4),.
    FOREIGN KEY (p_id) REFERENCES Product(product_id)
  );

  INSERT INTO Jersey (p_id, league, team, player, year)
  VALUES
    (1, 'NBA', 'Lakers', 'Wilt Chamberlain', '1972'),
    (2, 'NBA', 'TimberWolves', 'Kevin Garnett', '2003'),
    (3, 'NBA', 'Nuggets', 'Carmelo Anthony', '2003')
  ON CONFLICT DO NOTHING;
`;


const createAndSeedTables = `
  CREATE TABLE IF NOT EXISTS Customer (
    customer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email TEXT,
    user_name VARCHAR(255),
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    loyalty_points Integer

  );

  Create Table IF NOT EXISTS Address(
    user_id Integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    street VARCHAR(15),
    zipcode VARCHAR(5),
    city VARCHAR(15),
    state VARCHAR(2)

    FOREIGN KEY user_id REFRENCES Customer(customer_id)
  )

  CREATE TABLE IF NOT EXISTS Purchase (
    order_number INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    c_id INTEGER REFERENCES Customer(customer_id),
    order_date DATE,
    order_total DECIMAL(6,2)
  );

  CREATE TABLE IF NOT EXISTS Product (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    price DECIMAL(6,2),
    product_type VARCHAR(30),
    product_description TEXT,
    thumbnail TEXT,
    quantity INTEGER,
  );

  INSERT INTO Product (price, product_description, thumbnail,quantity)
   VALUES 
    (299.99, 'Wilt Chamberlain 1972 Los Angeles Lakers Jersey', '/images/WiltChamberlainJersey.avif',5),
    (299.99, 'Kevin Garnett 2003 Minnesota Timberwolves Jersey', '/images/GarnettTimberWolves.avif',5),
    (135.99, 'Carmelo Anthony 2003 Denver Nuggets Jersey', '/images/MeloPowderBlue.avif',5)
    
  ON CONFLICT DO NOTHING;

  CREATE TABLE IF NOT EXISTS Jersey(
    p_id INTEGER,
    league VARCHAR(10),
    team VARCHAR(20),
    player VARCHAR(15),
    year   VARCHAR(4)

    FOREIGN KEY(p_id) REFERENCES Product(product_id);
  )

  INSERT INTO Jersey(p_id,league,team,player,year)
    VALUES
    (1,'NBA','Lakers','Wilt Chamberlain','1972'),
    (2,'NBA','TimberWolves','Kevin Garnett','2003'),
    (3,'NBA','Nuggets','Carmelo Anthony','2003'),

  CREATE TABLE IF NOT EXISTS OrderedItems (
    o_id INTEGER,
    p_id INTEGER,
    PRIMARY KEY (o_id, p_id),
    FOREIGN KEY (o_id) REFERENCES Purchase(order_number),
    FOREIGN KEY (p_id) REFERENCES Product(product_id)
  );

`;

async function initDb() {
  try {
    await pool.query(insertMoreItems);
    console.log("Database initialized.");
  } catch (err) {
    console.error("Database setup error:", err);
  } finally {
    await pool.end();
  }
}

initDb();
