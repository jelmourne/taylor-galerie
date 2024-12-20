const express = require("express");

const { Product } = require("../models/product.cjs");
const { client, stripe } = require("../config/config.cjs");

router = express.Router();

router.post("/", async (req, res) => {
  const cart = JSON.parse(req.body.cart);

  let { error, data } = await client
    .from("products")
    .select("*")
    .in(
      "id",
      cart.map((v) => v.id)
    );

  if (error) {
    throw new Error(error);
    return;
  }

  let products = data.map((e) => {
    let temp = cart.find((v) => {
      return v.id == e.id;
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
    success_url: `${"https://localhost:3000"}/?message="success"`,
    cancel_url: `${"https://localhost:3000"}/?message="error"`,
  });
  res.send({ session });
});

router.post("/add", (req, res) => {});

module.exports = router;
