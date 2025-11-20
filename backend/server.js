const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const db = require("./dbSetup");

const app = express();

// -------------------------------------------
// MIDDLEWARE (CORS + COOKIE PARSER)
// -------------------------------------------
app.use(express.json());
app.use(cookieParser());

// FIXED CORS FOR COOKIES 🔥🔥🔥
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// -------------------------------------------
// REGISTER USER API
// -------------------------------------------
app.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phone, address, landmark, pin, city, state } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Required fields missing!" });
    }

    // Check if email exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({ message: "Email already registered!" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO users (fullname, email, password, phone, address, landmark, pin, city, state)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [fullname, email, hashedPassword, phone, address, landmark, pin, city, state],
        (err2, result2) => {
          if (err2) return res.status(500).json(err2);

          return res.status(201).json({
            message: "User registered successfully!",
            user_id: result2.insertId,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

// -------------------------------------------
// LOGIN USER API
// -------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required!" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0)
      return res.status(401).json({ message: "Invalid email or password!" });

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password!" });

    const userData = {
      uid: user.user_id,
      username: user.fullname,
      email: user.email,
    };

    // Set cookie
    res.cookie("greenmart_user", userData, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful!",
      user: userData,
    });
  });
});

// -------------------------------------------
// GET ALL PRODUCTS (with optional search query)
// -------------------------------------------
app.get("/products", (req, res) => {
  const search = req.query.search || "";

  let sql = "SELECT * FROM products";
  let params = [];

  if (search.trim() !== "") {
    console.log("case 2");
    sql = "SELECT * FROM products WHERE name LIKE ?";
    params.push("%" + search + "%");
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json(result);
  });
});

// -------------------------------------------
// GET CART ITEMS for a user (with product details)
// GET /cart/:user_id
// -------------------------------------------
app.get("/cart/:user_id", (req, res) => {
  const user_id = req.params.user_id;

const sql = `
  SELECT 
    c.cart_id,
    c.user_id,
    c.product_id,
    c.quantity,
    p.name,
    p.price,
    p.category,
    p.image AS image
  FROM cart c
  LEFT JOIN products p ON c.product_id = p.product_id
  WHERE c.user_id = ?
  ORDER BY c.added_at DESC
`;

  db.query(sql, [user_id], (err, rows) => {
    if (err) {
      console.error("DB error /cart/:user_id", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json(rows);
  });
});


// -------------------------------------------
// ADD or UPDATE CART ITEM
// POST /cart
// Body: { user_id, product_id, quantity }
// - if row exists: update quantity to provided value
// - if not exists: insert new row
// -------------------------------------------
app.post("/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || typeof quantity === "undefined") {
    return res.status(400).json({ message: "user_id, product_id and quantity are required" });
  }

  // Normalize quantity to integer >= 0
  const qty = parseInt(quantity, 10);
  if (isNaN(qty) || qty < 0) {
    return res.status(400).json({ message: "quantity must be a non-negative integer" });
  }

  // Option A: If you added unique (user_id, product_id) index, you can use INSERT ... ON DUPLICATE KEY UPDATE
  // Option B: Otherwise, check existence then insert or update.
  // We'll do existence-check for safe compatibility.

  const checkSql = "SELECT cart_id FROM cart WHERE user_id = ? AND product_id = ?";
  db.query(checkSql, [user_id, product_id], (checkErr, checkRows) => {
    if (checkErr) {
      console.error("DB error checking cart", checkErr);
      return res.status(500).json({ message: "Database error" });
    }

    if (checkRows.length > 0) {
      // existing row — update quantity
      const cart_id = checkRows[0].cart_id;

      // if qty === 0 => delete item
      if (qty === 0) {
        const delSql = "DELETE FROM cart WHERE cart_id = ?";
        db.query(delSql, [cart_id], (delErr) => {
          if (delErr) {
            console.error("DB error deleting cart item", delErr);
            return res.status(500).json({ message: "Database error" });
          }
          return res.json({ message: "Item removed from cart", cart_id });
        });
        return;
      }

      const updSql = "UPDATE cart SET quantity = ? WHERE cart_id = ?";
      db.query(updSql, [qty, cart_id], (updErr) => {
        if (updErr) {
          console.error("DB error updating cart", updErr);
          return res.status(500).json({ message: "Database error" });
        }
        return res.json({ message: "Cart updated", cart_id, quantity: qty });
      });

    } else {
      // not exists — insert (if qty > 0)
      if (qty === 0) {
        return res.status(400).json({ message: "Quantity must be > 0 to add item" });
      }

      const insSql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
      db.query(insSql, [user_id, product_id, qty], (insErr, insRes) => {
        if (insErr) {
          console.error("DB error inserting cart", insErr);
          return res.status(500).json({ message: "Database error" });
        }
        return res.status(201).json({
          message: "Item added to cart",
          cart_id: insRes.insertId,
          user_id,
          product_id,
          quantity: qty
        });
      });
    }
  });
});

//--------------------------
//    transfer api cart to order 
//----------------------------

// server.js (or your main server file)
app.post("/place-order/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { address } = req.body; // optional if you store addresses

  // Start transaction
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: "Transaction error", err });

    // 1️⃣ Get all cart items for the user
    const cartSql = `SELECT c.product_id, c.quantity, p.price
                     FROM cart c
                     JOIN products p ON c.product_id = p.product_id
                     WHERE c.user_id = ?`;
    db.query(cartSql, [user_id], (err, cartItems) => {
      if (err) {
        return db.rollback(() => res.status(500).json({ message: "DB error fetching cart", err }));
      }

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // 2️⃣ Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // 3️⃣ Insert into orders table
      const orderSql = "INSERT INTO orders (user_id, total_amount, payment_status, order_status) VALUES (?, ?, 'Pending', 'Processing')";
      db.query(orderSql, [user_id, totalAmount], (err, orderRes) => {
        if (err) {
          return db.rollback(() => res.status(500).json({ message: "DB error creating order", err }));
        }

        const order_id = orderRes.insertId;

        // 4️⃣ Prepare order_items insert
        const orderItemsData = cartItems.map(item => [order_id, item.product_id, item.quantity, item.price]);
        const orderItemsSql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
        db.query(orderItemsSql, [orderItemsData], (err) => {
          if (err) {
            return db.rollback(() => res.status(500).json({ message: "DB error inserting order items", err }));
          }

          // 5️⃣ Delete cart items
          const deleteCartSql = "DELETE FROM cart WHERE user_id = ?";
          db.query(deleteCartSql, [user_id], (err) => {
            if (err) {
              return db.rollback(() => res.status(500).json({ message: "DB error clearing cart", err }));
            }

            // Commit transaction
            db.commit((err) => {
              if (err) {
                return db.rollback(() => res.status(500).json({ message: "Transaction commit failed", err }));
              }
              return res.json({ message: "Order placed successfully", order_id });
            });
          });
        });
      });
    });
  });
});

//------------------------------
// fetch orders 
//------------------------------

// GET all orders for a user with items
app.get("/my-orders/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const sql = `
    SELECT 
      o.order_id,
      o.total_amount,
      o.payment_status,
      o.order_status,
      o.created_at,
      oi.order_item_id,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name,
      p.category,
      p.image AS image
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.product_id
    WHERE o.user_id = ?
    ORDER BY o.order_id DESC, oi.order_item_id ASC
  `;

  db.query(sql, [user_id], (err, rows) => {
    if (err) {
      console.error("DB error /my-orders/:user_id", err);
      return res.status(500).json({ message: "Database error" });
    }

    // Group by order_id
    const orders = {};
    rows.forEach(row => {
      if (!orders[row.order_id]) {
        orders[row.order_id] = {
          order_id: row.order_id,
          total_amount: row.total_amount,
          payment_status: row.payment_status,
          order_status: row.order_status,
          created_at: row.created_at,
          items: []
        };
      }
      if (row.order_item_id) {
        orders[row.order_id].items.push({
          order_item_id: row.order_item_id,
          product_id: row.product_id,
          name: row.name,
          category: row.category,
          image: row.image,
          quantity: row.quantity,
          price: row.price
        });
      }
    });

    return res.json(Object.values(orders));
  });
});


// -------------------------------------------
// START SERVER
// -------------------------------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
