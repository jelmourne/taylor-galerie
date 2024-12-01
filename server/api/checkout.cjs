require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SK);

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
