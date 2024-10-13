const express = require("express");
const cors = require("cors");
const Product = require("./models/product.cjs");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SK);
const supabase = require("@supabase/supabase-js");

const client = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SK
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkout-process", async (req, res) => {
  let { error, data } = await client
    .from("products")
    .select("*")
    .in(
      "id",
      req.body.cart.map((v) => v.productId)
    );

  if (error) {
    console.log(error);
    return;
  }

  let products = data.map((e) => {
    let temp = req.body.cart.find((v) => {
      return v.productId == e.id;
    });

    return new Product(
      e.name,
      e.price,
      e.image[0],
      e.description,
      temp.quantity
    );
  });

  const session = await stripe.checkout.sessions.create({
    line_items: products,
    mode: "payment",
    success_url: `${"https://localhost:5173/src/static"}/destination?message="success"`,
    cancel_url: `${"https://localhost:5173/src/static"}/destination?message="error"`,
  });
  res.send({ session });
});

// add supabase for database
async function getCategory(category) {
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");
  if (error) {
    throw new Error(error);
  }

  return data;
}
app.get("/products?:category", async (req, res) => {
  const category = req.query.category;

  if (category) {
    const data = await getCategory(category);
    res.send(data);
    return;
  }
  const { data, error } = await client.from("products").select("*").order("id");

  if (error) {
    throw new Error(error);
  }

  res.send(data);
});

app.get("/product?:id", async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return;
  }

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error);
  }

  res.send(data);
});

app.get("/search?:name", async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return;
  }

  const { data, error } = await client
    .from("products")
    .select("*")
    .ilike("name", `%${name}%`)
    .limit(4);

  if (error) {
    throw new Error(error);
  }
  res.send(data);
});

app.post("/email", async (req, res) => {
  const params = req.body.message;
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
