import { navbar, initNav } from "./src/template/navbar";
import { cart, initCart } from "./src/template/cart";
import { initMessage, message } from "./src/template/message";

document.body.prepend(cart());
document.body.prepend(navbar());
document.body.prepend(message());

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: "1000",
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content div", {
  duration: 1000,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});

const cartObj = new initCart();
initNav();
initMessage();
