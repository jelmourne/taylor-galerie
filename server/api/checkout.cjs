const express = require("express");

const { Product } = require("../models/product.cjs");
const { client, stripe } = require("../config/config.cjs");

router = express.Router();

router.post("/", async (req, res) => {
  let { error, data } = await client
    .from("products")
    .select("*")
    .in(
      "id",
      req.body.cart.map((v) => v.productId)
    );

  if (error) {
    throw new Error(error);
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
    success_url: `${"https://localhost:3000"}/destination?message="success"`,
    cancel_url: `${"https://localhost:3000"}/destination?message="error"`,
  });
  res.send({ session });
});

router.post("/add", (req,res) => {
  
})

module.exports = router;
