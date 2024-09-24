import products from "./products";
import api from "./config/api";

async function checkout() {
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

document.getElementById("checkoutBtn").addEventListener("click", checkout);

// initialize page components
let iconCart = document.querySelector(".icon-cart");
let closeBtn = document.querySelector(".cartTab .close");
let body = document.querySelector("body");
let productContent = document.getElementById("contentTab");

let cart = [];

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
  let totalHTML = document.querySelector("icon-cart span");
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity = totalQuantity + item.quantity;
  });
  totalHTML.innerText = totalQuantity;
};
// event click
document.addEventListener("click", (event) => {
  let buttonClick = event.target;
  let idProduct = buttonClick.value;

  setProductInCart(idProduct);
});

products.map((e, i) => {
  productContent.innerHTML += `
      <img src="/${e.image}"/>
      <h2>${e.name}</h2>
      <div class="price">$${e.price}</div>
      <button class="addCart" value=${e.id}>
        
           Add To Cart
         </button>
    `;
});
