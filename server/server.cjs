const express = require("express");
const cors = require("cors");
const Product = require("./models/product.cjs");

const productApi = require("./api/product.cjs");

// install ejs

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productApi);

// add supabase for database

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
