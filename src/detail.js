import { getProduct, getProducts } from "./helpers";
import { navbar } from "./template/navbar";

document.body.prepend(navbar());

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
        <button class="addCart" data-id=${e.id}>
          
             Add To Cart
           </button>
      </div>`;
  });
};

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
  prodPrice.innerHTML = data.price;
  prodDesc.innerHTML = data.description;
};

initApp();
loadProd();
