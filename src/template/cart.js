export function cart() {
  const cartTab = document.createElement("div");
  cartTab.classList.add("cartTab");

  cartTab.innerHTML = `<div class="cartTab">
      <h1>Shopping Cart</h1>
      <div class="listCart">show item here</div>
      <div class="btn">
        <button class="close">CLOSE</button>
        <button class="checkOut" id="checkoutBtn">
          Check Out
        </button>
      </div>
    </div>`;
  return cartTab;
}

export class initCart {
  constructor(data) {
    this.cart = JSON.parse(sessionStorage.getItem("cart"));
    // api call for each item int cart
    this.data = data;
    this.refreshCartHTML();
  }

  refreshCartHTML() {
    let listHTML = document.querySelector(".listCart");
    let totalHTML = document.querySelector(".icon-cart span");
    let totalQuantity = 0;
    listHTML.innerHTML = null;

    this.cart.forEach((item) => {
      totalQuantity += item.quantity;

      const info = this.data.find((v) => {
        return v.id == item.productId;
      });

      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <div class="image">
        <img src="${info.image}">
        </div>
        <div class="name">${info.name}</div>
        <div class="totalPrice">${info.price}</div>
        <div class="quantity">
        <span class="minus" data-id=${info.id}> - </span>
        <span> ${item.quantity} </span>
        <span class="plus" data-id=${info.id}> + </span>
        </div>
        `;

      listHTML.appendChild(newItem);
    });

    totalHTML.innerText = totalQuantity;
  }

  setProductInCart(idProduct, quantity) {
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
      this.cart.push({ productId: idProduct, quantity: 1 });
    } else {
      this.cart[index].quantity = isPositive
        ? (this.cart[index].quantity += 1)
        : (this.cart[index].quantity -= 1);
    }

    sessionStorage.setItem("cart", JSON.stringify(this.cart));

    this.refreshCartHTML();
  }
}
