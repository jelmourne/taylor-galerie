import { getProducts, postCheckout } from "./helpers";

const data = await getProducts();

const loadContent = () => {
  if (!data) {
    productContent.innerHTML = "<p>No Products Found try Refreshing</p>";
  }

  data.map((e, i) => {
    productContent.innerHTML += `
      <div class="item">
        <a href="detail.html?id=${e.id}">
          <img src="${e.image}"/>
        </a>
        <h2>${e.name}</h2>
        <div class="price">$${e.price}</div>
        <button class="addCart" data-id=${e.id}>
          
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

var cart = [];

// initialize page components
document.getElementById("checkoutBtn").addEventListener("click", postCheckout);
let iconCart = document.querySelector(".icon-cart");
let closeBtn = document.querySelector(".cartTab .close");
let body = document.querySelector("body");
let productContent = document.getElementById("contentTab");

loadContent();

iconCart.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});
closeBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});

const setProductInCart = (idProduct, quantity) => {
  // edge case no product id
  if (!idProduct) {
    return;
  }
  // find index value of item
  const index = cart.findIndex((value) => {
    return value.productId == idProduct;
  });

  const isPositive = quantity > 0 ? true : false;

  if (!isPositive && cart[index].quantity == 1) {
    cart.splice(index, 1);
  } else if (index < 0) {
    cart.push({ productId: idProduct, quantity: 1 });
  } else {
    cart[index].quantity = isPositive
      ? (cart[index].quantity += 1)
      : (cart[index].quantity -= 1);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  refreshCartHTML();
};

const refreshCartHTML = () => {
  let listHTML = document.querySelector(".listCart");
  let totalHTML = document.querySelector(".icon-cart span");
  let totalQuantity = 0;
  listHTML.innerHTML = null;

  cart.forEach((item) => {
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
        <span class="minus" data-id=${info.id}> - </span>
        <span> ${item.quantity} </span>
        <span class="plus" data-id=${info.id}> + </span>
      </div>
    `;

    listHTML.appendChild(newItem);
  });

  totalHTML.innerText = totalQuantity;
};
// event click
document.addEventListener("click", (event) => {
  let buttonClick = event.target;
  let idProduct = buttonClick.dataset.id;

  if (
    buttonClick.classList.contains("addCart") ||
    buttonClick.classList.contains("plus")
  ) {
    setProductInCart(idProduct, 1);
  } else {
    setProductInCart(idProduct, -1);
  }
});

const initApp = () => {
  if (sessionStorage.getItem("cart")) {
    cart = JSON.parse(sessionStorage.getItem("cart"));
  }
  refreshCartHTML();
};

initApp();
