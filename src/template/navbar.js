import { getSearch, postEmail } from "../helpers";

// insert template for navbar
export function navbar() {
  const nav = document.createElement("nav");
  nav.classList.add("activeTabCart");

  nav.innerHTML = `<div class="nav__header">
  <div>
    <i class="ri-menu-line"></i>
  </div>
  <div class="nav__logo">
    <a href="/" class="logo">furni.shop</a>
  </div>
  <div>
    <div class="nav__search" id="nav-search">
      <input type="text" placeholder="Search" value=""/>
      <span><i class="ri-search-2-line"></i></span>
      <div class="search__items hidden"></div>
    </div>
    <div class="icon-cart">    
      <i class="ri-shopping-cart-line"></i>
      <span>0</span>
    </div>
  </div>
 
</div>`;
  return nav;
}

export function initNav() {
  let body = document.querySelector("body");
  let iconCart = document.querySelector(".icon-cart");
  let closeBtn = document.querySelector(".cartTab .close");
  const navSearch = document.getElementById("nav-search");
  const navSearchBtn = document.querySelector(".ri-search-2-line");
  const searchResults = document.querySelector(".search__items");

  iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  navSearchBtn.addEventListener("click", () => {
    navSearch.classList.toggle("open");
  });

  let timer;
  navSearch.addEventListener("input", () => {
    if (timer) {
      clearTimeout(timer);
    }

    if (!navSearch.value) {
      searchResults.classList.add("hidden");
    }

    timer = setTimeout(async () => {
      const data = await getSearch(navSearch.children[0].value);
      searchResults.innerHTML = "";
      searchResults.classList.toggle("hidden");
      data.forEach((element) => {
        searchResults.innerHTML += `<a href='http://localhost:5173/src/static/detail.html?id=${element.id}'>${element.name}</a>`;
      });
    }, 1000);
  });
}

export function openContact() {
  const contact = document.getElementById("contact");
  contact.addEventListener("click", () => {});
}
