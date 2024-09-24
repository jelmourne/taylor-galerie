const express = require("express");
const cors = require("cors");
const Product = require("./models/product.cjs");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SK);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkout-process", async (req, res) => {
  let products = [];

  req.body.cart.forEach((elem) => {
    products.push(
      new Product(elem.name, elem.price, elem.image, elem.description, elem.qty)
    );
  });

  const session = await stripe.checkout.sessions.create({
    line_items: products,
    mode: "payment",
    success_url: `${process.env.DOMAIN}/success.html`,
    cancel_url: `${process.env.DOMAIN}/cancel.html`,
  });
  res.send({ session });
});

// add supabase for database

// add confirmation to clients

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
