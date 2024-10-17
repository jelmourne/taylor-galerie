import api from "./config/api";
import { message } from "./template/message";

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

async function sendMessage(room, message) {
  const data = await api
    .post("/messages", {
      id: room,
      message: message,
      is_client: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}

export async function postMessage(message) {
  if (!sessionStorage.getItem("chat_room")) {
    const room = Math.floor(100000000 + Math.random() * 900000000);

    sessionStorage.setItem("chat_room", room);

    await sendMessage(room, message);
  }

  const room = sessionStorage.getItem("chat_room");

  await sendMessage(room, message);
}

export async function getMessages(chat_room) {
  const data = api
    .get("/messages", { params: { chat_room: chat_room } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return data;
}
