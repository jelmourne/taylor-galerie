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
  <li><a href="#contact">Contact</a></li>
</ul>
<div class="nav__search" id="nav-search">
  <input type="text" placeholder="Search" />
  <span><i class="ri-search-2-line"></i></span>
  <div class="icon-cart">    
    <i class="ri-shopping-cart-line"></i>
    <span>0</span>
    </div>
</div>`;
  return nav;
}
