export function baseUrl() {
  if (location.hostname == "localhost") {
    return "localhost:3000";
  }

  return "taylorgalarie.com";
}

export function httpProtocol(ws = false) {
  if (location.hostname == "localhost") return ws ? "ws:" : "http:";

  return ws ? "wss:" : "https:";
}

export async function getSearch(name) {
  const data = await fetch(
    `${httpProtocol()}//${baseUrl()}/api/products/search?name=${name}`
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

  const session = await fetch(`${httpProtocol()}//${baseUrl()}/api/checkout`, {
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

export async function postSingleCheckout(id) {
  const session = await fetch(
    `${httpProtocol()}//${baseUrl()}/api/checkout/${id}`,
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  location.replace(session.session.url);
}

export async function getSimilar(id, category) {
  const data = await fetch(
    `${httpProtocol()}//${baseUrl()}/api/products/similar?id=${id}&category=${category}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
  return data;
}

export function createRoom() {
  if (sessionStorage.getItem("chat_room")) {
    return;
  }
  const room = Math.floor(100000000 + Math.random() * 900000000);

  sessionStorage.setItem("chat_room", room);

  return room;
}

export async function postEmail(form) {
  const response = await fetch(`${httpProtocol()}//${baseUrl()}/api/email`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form: form }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
}
