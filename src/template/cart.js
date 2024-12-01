import { postCheckout } from "../helpers";

export function cart() {
  const cartTab = document.createElement("div");
  cartTab.classList.add("cartTab");

  cartTab.innerHTML = `<div class="cartTab">
      <h1>Shopping Cart</h1>
      <div class="listCart">show item here</div>
      <div class="btn">
        <button class="close">Close</button>
        <button class="checkOut" id="checkoutBtn">
          Check Out
        </button>
      </div>
    </div>`;
  return cartTab;
}

export class initCart {
  constructor() {
    this.cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : [];

    this.refreshCartHTML();
  }

  refreshCartHTML() {
    let listHTML = document.querySelector(".listCart");
    let totalHTML = document.querySelector(".icon-cart span");
    let totalQuantity = 0;
    listHTML.innerHTML = null;

    this.cart.forEach((item) => {
      totalQuantity += item.quantity;

      /* add event listener for cart add and remove */

      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <div class="image">
        <img src="${item.image}">
        </div>
        <div class="name">${item.name}</div>
        <div class="totalPrice">${item.price}</div>
        <div class="quantity">
        <span class="minus" data-id='${item.productId},${item.name},${item.price},${item.image}'> - </span>
        <span> ${item.quantity} </span>
        <span class="plus" data-id='${item.productId},${item.name},${item.price},${item.image}'> + </span>
        </div>
        `;

      listHTML.appendChild(newItem);
    });

    totalHTML.innerText = totalQuantity;

    const checkout = document.getElementById("checkoutBtn");
    checkout.addEventListener("click", postCheckout);
  }

  setProductInCart(idProduct, name, price, image, quantity) {
    // edge case no product id
    if (!idProduct) {
      return;
    }
    // find index value of item
    const index = this.cart.findIndex((value) => {
      return value.productId == idProduct;
    });

    const isPositive = quantity > 0 ? true : false;

    if (!isPositive && this.cart[index].quantity == 1) {
      this.cart.splice(index, 1);
    } else if (index < 0) {
      this.cart.push({
        productId: idProduct,
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    } else {
      this.cart[index].quantity = isPositive
        ? (this.cart[index].quantity += 1)
        : (this.cart[index].quantity -= 1);
    }

    sessionStorage.setItem("cart", JSON.stringify(this.cart));

    this.refreshCartHTML();
  }
}
