const express = require("express");

const { Product } = require("../models/product.cjs");
const { client, stripe } = require("../config/config.cjs");

router = express.Router();

router.post("/:id", async (req, res) => {
  const id = req.params.id;

  if (id === null) {
    return;
  }

  let { error, data } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error);
  }

  const product = new Product(
    `${e.family} ${e.subcategory}`,
    data.price,
    data.image[0],
    data.description,
    1
  );

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "cad",
          },
          display_name: "Standard shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    line_items: [product],
    mode: "payment",
    success_url: `https://${req.get("host")}/?message="success"`,
    cancel_url: `https://${req.get("host")}/?message="error"`,
  });
  res.send({ session });
});

router.post("/", async (req, res) => {
  const cart = JSON.parse(req.body.cart);

  if (cart === null) {
    return;
  }

  let { error, data } = await client
    .from("products")
    .select("*")
    .in(
      "id",
      cart.map((v) => v.id)
    );

  if (error) {
    throw new Error(error);
  }

  let products = data.map((e) => {
    let temp = cart.find((v) => {
      return v.id == e.id;
    });

    return new Product(
      `${e.family} ${e.subcategory}`,
      e.price,
      e.image[0],
      e.description,
      temp.quantity
    );
  });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "cad",
          },
          display_name: "Standard shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],

    line_items: products,
    mode: "payment",
    success_url: `https://${req.get("host")}/?message="success"`,
    cancel_url: `https://${req.get("host")}/?message="error"`,
  });
  res.send({ session });
});

module.exports = router;
