import { getSearch } from "../helpers";

// insert template for navbar
export function navbar() {
  const nav = document.createElement("nav");
  nav.classList.add("activeTabCart");

  nav.innerHTML = `<div class="nav__header">
  <div class="nav__logo">
    <a href="/" class="logo">furni.shop</a>
  </div>
  <div class="nav__menu__btn" id="menu-btn">
    <i class="ri-menu-line"></i>
  </div>
</div>
<ul class="nav__links" id="nav-links">
  <li><a href="/">Home</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="src/static/products.html">Product</a></li>
  <li><a id="contact">Contact</a></li>
</ul>
<div class="nav__search" id="nav-search">
  <input type="text" placeholder="Search" value=""/>
  <span><i class="ri-search-2-line"></i></span>
  <div class="search__items hidden">
  
  </div>
  </div>
   <div class="icon-cart">    
    <i class="ri-shopping-cart-line"></i>
    <span>0</span>
  </div>

  <div id="contactFrom" class="contactForm hidden">
  <i class="ri-close-large-line"></i>
  <p>Contact Us</p>
  <div>
    <img src="https://ljsycmobqargkvvhrtgz.supabase.co/storage/v1/object/public/product-images/product.png" />
    <form>
      <input type="text" placeholder="Fullname" />
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Subject" />
      <textarea placeholder="Enter your message"></textarea>
      <input type="submit" value="Send" />
    </form>
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

  const contactFrom = document.querySelector(".contactForm");

  iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  navSearchBtn.addEventListener("click", () => {
    navSearch.classList.toggle("open");
  });

  document.querySelector("#contact").addEventListener("click", () => {
    contactFrom.classList.remove("hidden");
  });

  document
    .querySelector(".ri-close-large-line")
    .addEventListener("click", () => {
      contactFrom.classList.add("hidden");
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
