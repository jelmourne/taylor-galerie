import { getProduct } from "./helpers";

const params = new URLSearchParams(location.search);

if (!params.entries < 0) {
  location.replace("localhost:5173/src/static/detail.html");
}

const data = await getProduct(params.get("id"));

const prodImg = document.querySelector(".image img");
const prodName = document.querySelector(".name");
const prodPrice = document.querySelector(".price");
const prodDesc = document.querySelector(".description");

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
console.log(data);
