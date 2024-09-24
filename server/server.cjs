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
  let products = await req.body.cart.map(async (elem) => {
    let { error, data } = await client
      .from("products")
      .select("*")
      .eq("id", elem.productId);

    if (error) {
      console.log(error);
    }

    return new Product(
      data[0].name,
      data[0].price,
      data[0].image,
      data[0].description,
      elem.qty
    );
  });
  console.log(products);
  /*
  const session = await stripe.checkout.sessions.create({
    line_items: products,
    mode: "payment",
    success_url: `${process.env.DOMAIN}/success.html`,
    cancel_url: `${process.env.DOMAIN}/cancel.html`,
  });
  res.send({ session });
  */
});

// add supabase for database
app.get("/products", async (req, res) => {
  const { data, err } = await client.from("products").select("*");

  if (err) {
    res.status(400);
  }

  res.send(data);
});

// add confirmation to clients

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
