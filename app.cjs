const express = require("express");
const path = require("path");
const { client } = require("./server/config/config.cjs");
const { getCategories } = require("./server/helpers.cjs");

const productApi = require("./server/api/product.cjs");
const checkoutApi = require("./server/api/checkout.cjs");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/html"));
app.use("/node_modules", express.static(__dirname + "/node_modules/"));

app.use("/api/products", productApi);
app.use("/api/checkout", checkoutApi);
/*
app.use("/api/messages", messageApi);
*/

app.get("/", async (req, res) => {
  const categories = await getCategories();

  res.render("index", { categories: categories });
});

app.get("/products", async (req, res) => {
  const categories = await getCategories();

  const category = req.query.category;

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");

  if (error) {
    throw new Error(error);
  }
  res.render("products", { products: data, categories: categories });
});

app.get("/product/:id", (req, res) => {
  res.render("product");
});

// add supabase for database

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
