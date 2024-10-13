import api from "./config/api";

export async function getProducts(category) {
  const params = { category: !category ? {} : category };

  const data = await api
    .get("/products", {
      params: params,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

export async function getSearch(name) {
  const data = await api
    .get("/search", {
      params: { name: name },
    })
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
      params: { id: id },
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

export async function postEmail(message) {
  await api
    .post("/email", { message: message })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
}
