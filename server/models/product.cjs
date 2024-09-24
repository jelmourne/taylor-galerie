class Product {
  constructor(name, price, image, description, qty) {
    (this.price_data = {
      currency: "cad",
      unit_amount: price,
      product_data: {
        name: name,
        description: description,
        images: [image],
      },
    }),
      (this.quantity = qty);
  }
}
module.exports = Product;
