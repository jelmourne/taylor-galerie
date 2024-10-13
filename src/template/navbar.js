import { getSearch, postEmail } from "../helpers";

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

  <div class="blur hidden"></div>
  <div id="contactFromDiv" class="contactForm hidden">
  <i class="ri-close-large-line"></i>
  <p>Contact Us</p>
  <div>
    <img src="https://ljsycmobqargkvvhrtgz.supabase.co/storage/v1/object/public/product-images/product.png" />
    <form id="contactForm" action="post">
      <input id="name" type="text" placeholder="Fullname" />
      <input id="email" type="email" placeholder="Email" />
      <input id="subject" type="text" placeholder="Subject" />
      <textarea id="message" placeholder="Enter your message"></textarea>
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

  const contactFromDiv = document.querySelector(".contactForm");
  const contactFrom = document.querySelector("#contactForm");

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
    contactFromDiv.classList.remove("hidden");
    document.querySelector(".blur").classList.remove("hidden");
  });

  contactFrom.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
      throw new Error("Invalid data");
    }

    const msg = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    postEmail(msg);
  });

  document
    .querySelector(".ri-close-large-line")
    .addEventListener("click", () => {
      contactFromDiv.classList.add("hidden");
      document.querySelector(".blur").classList.add("hidden");
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
