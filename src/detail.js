import { getProduct, getProducts } from "./helpers";
import { initNav, navbar } from "./template/navbar";
import { cart, initCart } from "./template/cart";
import { message } from "./template/message";

const params = new URLSearchParams(location.search);

if (!params.entries < 0) {
  location.replace("localhost:5173/src/static/detail.html");
}

const data = await getProduct(params.get("id"));
const similarProd = await getProducts(data.category);

const prodImg = document.querySelector(".image img");
const prodName = document.querySelector(".name");
const prodPrice = document.querySelector(".price");
const prodDesc = document.querySelector(".description");
const prodButton = document.querySelector(".addCart");
const listProduct = document.querySelector(".similarProduct");

const loadProd = () => {
  similarProd.map((e, i) => {
    listProduct.innerHTML += `
    <div class="item">
    <a href="detail.html?id=${e.id}">
    <img src="${e.image}"/>
    </a>
    <h2>${e.name}</h2>
    <div class="price">$${e.price}</div>
    <button class="addCart" data-id='${e.id},${e.name},${e.price},${e.image}'>
    
    Add To Cart
    </button>
    </div>`;
  });
};

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

prodImg.addEventListener("click", () => {
  const current = prodImg.src;
  if (data.image[0] != current) {
    prodImg.src = data.image[0];
    return;
  }
  prodImg.src = data.image[1];
});

const initApp = () => {
  if (!data) {
    return;
  }
  prodImg.src = data.image;
  prodName.innerHTML = data.name;
  prodPrice.innerHTML = "$" + data.price;
  prodDesc.innerHTML = data.description;
  prodButton.dataset.id = `${data.id}, ${data.name}, ${data.price}, ${data.image}`;
};

initApp();
loadProd();

document.body.prepend(cart());
document.body.prepend(navbar());
document.body.prepend(message());

initNav();
const cartObj = new initCart();
