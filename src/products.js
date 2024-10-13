import { getProducts, postCheckout } from "./helpers";
import { navbar, initNav } from "./template/navbar";
import { cart, initCart } from "./template/cart";
import { message } from "./template/message";

let productContent = document.getElementById("contentTab");

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
    <button class="addCart" data-id='${e.id},${e.name},${e.price},${e.image}'>
    
    Add To Cart
    </button>
    </div>
    `;
  });
};

/*
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
  */

loadContent();

// event click
document.addEventListener("click", (event) => {
  let buttonClick = event.target;
  let productData = buttonClick.dataset.id.split(",");

  const idProduct = productData[0];
  const nameProduct = productData[1];
  const priceProduct = productData[2];
  const imageProduct = productData[3];

  if (
    buttonClick.classList.contains("addCart") ||
    buttonClick.classList.contains("plus")
  ) {
    cartObj.setProductInCart(
      idProduct,
      nameProduct,
      priceProduct,
      imageProduct,
      1
    );
  } else {
    cartObj.setProductInCart(
      idProduct,
      nameProduct,
      priceProduct,
      imageProduct,
      -1
    );
  }
});

document.body.prepend(cart());
document.body.prepend(navbar());
document.body.prepend(message());

const cartObj = new initCart();

initNav();
