import api from "./config/api";

export async function getProducts() {
  const data = await api
    .get("/products")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

export async function getProduct(id) {
  const data = await api
    .get("/product", {
      params: {
        id: id,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

export async function postCheckout() {
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));

  await api
    .post("/checkout-process", { cart: cartItems })
    .then((res) => {
      location.replace(res.data.session.url);
    })
    .catch((err) => {
      console.log(err);
    });
}
