import api from "./config/api";

async function getProducts() {
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

async function postCheckout() {
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

const data = await getProducts();

const loadContent = async () => {
  if (!data) {
    productContent.innerHTML = "<p>No Products Found try Refreshing</p>";
  }

  data.map((e, i) => {
    productContent.innerHTML += `
      <div class="item">
        <img src="${e.image}"/>
        <h2>${e.name}</h2>
        <div class="price">$${e.price}</div>
        <button class="addCart" value=${e.id}>
          
             Add To Cart
           </button>
      </div>
           `;
  });
};

const params = new URLSearchParams(location.search);

if (params.size > 0) {
  const messageBanner = document.getElementById("messageBanner");
  const message = params.get("message");
  if (message == "error") {
    messageBanner.innerHTML = "Checkout cancelled";
  } else if (message == "successful") {
    messageBanner.innerHTML = "Purchase successful";
  }
}

// initialize page components
document.getElementById("checkoutBtn").addEventListener("click", postCheckout);
let iconCart = document.querySelector(".icon-cart");
let closeBtn = document.querySelector(".cartTab .close");
let body = document.querySelector("body");
let productContent = document.getElementById("contentTab");

await loadContent();
let cart = JSON.parse(sessionStorage.getItem("cart"));

iconCart.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});
closeBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});

const setProductInCart = (idProduct) => {
  // edge case no product id
  if (!idProduct) {
    return;
  }
  // find index value of item
  const index = cart.findIndex((value) => {
    return value.productId == idProduct;
  });
  // check if index/id does no exist
  if (index < 0) {
    cart.push({ productId: idProduct, quantity: 1 });
  } else {
    cart[index].quantity += 1;
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  refreshCartHTML();
};

const refreshCartHTML = () => {
  let listHTML = document.querySelector(".listCart");
  let totalHTML = document.querySelector(".icon-cart span");
  let totalQuantity = 0;
  listHTML.innerHTML = null;

  JSON.parse(sessionStorage.getItem("cart")).forEach((item) => {
    totalQuantity += item.quantity;

    const info = data.find((v) => {
      return v.id == item.productId;
    });

    let newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
      <div class="image">
        <img src="${info.image}">
      </div>
      <div class="name">${info.name}</div>
      <div class="totalPrice">${info.price}</div>
      <div class="quantity">
        <span class="minus"> - </span>
        <span> ${item.quantity} </span>
        <span class="plus"> + </span>
      </div>
    `;

    listHTML.appendChild(newItem);
  });

  totalHTML.innerText = totalQuantity;
};
// event click
document.addEventListener("click", (event) => {
  let buttonClick = event.target;
  let idProduct = buttonClick.value;

  setProductInCart(idProduct);
});
