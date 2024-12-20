let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

export function refreshCart(firstLoad, cartList) {
  var cartList = document.querySelector(".listCart");
  const cartQuantity = document.querySelector(".icon-cart span");
  cartQuantity.addEventListener("DOMSubtreeModified", () => refreshCart(false));

  cartList.innerHTML = null;
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
    let newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
        <div class="image">
        <img src="${item.image}">
        </div>
        <div class="name">${item.name}</div>
        <div class="totalPrice">${item.price}</div>
        <div class="quantity">
        <span class="minus" data-id='${item.id},${item.name},${item.price},${item.image}'> - </span>
        <span> ${item.quantity} </span>
        <span class="plus" data-id='${item.id},${item.name},${item.price},${item.image}'> + </span>
        </div>
        `;

    cartList.appendChild(newItem);

    newItem.querySelector(".minus").addEventListener("click", (e) => {
      const [id, name, price, image] = e.target.dataset.id.split(",");
      setItemCart(id, name, price, image, -1);
    });

    newItem.querySelector(".plus").addEventListener("click", (e) => {
      const [id, name, price, image] = e.target.dataset.id.split(",");
      setItemCart(id, name, price, image, 1);
    });
  });

  if (firstLoad) {
    cartQuantity.innerHTML = totalQuantity;
  }
}

export function setItemCart(id, name, price, image, quantity) {
  if (!id) {
    return;
  }
  // find index value of item
  const index = cart.findIndex((value) => {
    return value.id == id;
  });

  const isPositive = quantity > 0 ? true : false;

  if (!isPositive && cart[index].quantity == 1) {
    cart.splice(index, 1);
  } else if (index < 0) {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  } else {
    cart[index].quantity = isPositive
      ? (cart[index].quantity += 1)
      : (cart[index].quantity -= 1);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  refreshCart();
}

export function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".icon-cart span").textContent = cartCount;
}
