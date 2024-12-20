class Product {
  constructor(name, price, image, description, qty) {
    (this.price_data = {
      currency: "cad",
      unit_amount: price * 100,
      product_data: {
        name: name,
        description: description,
        images: [image],
      },
    }),
      (this.quantity = qty);
  }
}
exports.Product = Product;
