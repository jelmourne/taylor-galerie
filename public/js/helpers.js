export async function getSearch(name) {
  const data = await fetch(
    `http://localhost:3000/api/products/search?name=${name}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  return data;
}

export async function postCheckout() {
  const cartItems = sessionStorage.getItem("cart");

  const session = await fetch("http://localhost:3000/api/checkout", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: cartItems }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  location.replace(session.session.url);
}

async function sendMessage(room, message) {
  const data = await fetch("http://localhost:3000/api/messages/message", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: room, message: message, is_client: true }),
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
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
/*
      
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
*/
