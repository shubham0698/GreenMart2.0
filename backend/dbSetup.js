const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "greenmart"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");

  // Run all create table queries
  createTables();
});

function runQuery(sql) {
  db.query(sql, (err) => {
    if (err) console.log("❌ Error:", err.sqlMessage);
    else console.log("✔️ Table checked/created");
  });
}

function createTables() {

  // 1. categories table
  // runQuery(`
  //   CREATE TABLE IF NOT EXISTS categories (
  //     category_id INT AUTO_INCREMENT PRIMARY KEY,
  //     name VARCHAR(100) NOT NULL,
  //     description TEXT,
  //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //   );
  // `);

  // 2. products table
  runQuery(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      category varchar(100),
      name VARCHAR(200) NOT NULL,
      price DECIMAL(10,2) NOT NULL,      
      image VARCHAR(255)
    );
  `);

  // 3. users table
  runQuery(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      fullname VARCHAR(150) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(15),
      address TEXT,
      landmark VARCHAR(150),
      pin VARCHAR(6),
      city VARCHAR(50),
      state VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);


  // 4. cart table
  runQuery(`
    CREATE TABLE IF NOT EXISTS cart (
      cart_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      product_id INT,
      quantity INT DEFAULT 1,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `);

  // 5. orders table
  runQuery(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      total_amount DECIMAL(10,2),
      payment_status VARCHAR(20) DEFAULT 'Pending',
      order_status VARCHAR(20) DEFAULT 'Processing',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
  `);

  // 6. order_items table
  runQuery(`
    CREATE TABLE IF NOT EXISTS order_items (
      order_item_id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      quantity INT,
      price DECIMAL(10,2),
      FOREIGN KEY (order_id) REFERENCES orders(order_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `);

  // 7. admin_users table
  runQuery(`
    CREATE TABLE IF NOT EXISTS admin_users (
      admin_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("🎉 All tables verified/created successfully!");
}

module.exports = db;
