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

    return new Product(e.name, e.price, e.image, e.description, temp.quantity);
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
app.get("/products", async (req, res) => {
  const { data, error } = await client.from("products").select("*").order("id");

  if (error) {
    res.status(400);
  }

  res.send(data);
});

app.get("/product?:id", async (req, res) => {
  const id = req.query.id;

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    res.status(400);
  }

  res.send(data);
});

// add confirmation to clients

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
