'use strict';
let products = [];
let cart = [];
const cardsElement = document.querySelector('.js-products');

//get products
const getApi = () => {
  fetch('./api/data.json')
    .then((response) => response.json())
    .then((data) => {
      products = data.cart.items;

      paintProducts();
    });
};

//paint products

const getProductHtmlCode = (product) => {
  let htmlCode = `<article class="card">`;
  htmlCode += `<img src="${product.imageUrl}" class="card__img" alt="Camiseta de ${product.name}">`;
  htmlCode += `<h3 class="card__title">${product.name}</h3>`;
  htmlCode += `<p class="card__description">${product.price}€</p>`;
  htmlCode += `<button class="js-add-product card__btn" data-id="${product.id}">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  console.log(product.id);
  return htmlCode;
};

const paintProducts = () => {
  let htmlCode = '';
  for (const product of products) {
    htmlCode += getProductHtmlCode(product);
  }
  cardsElement.innerHTML = htmlCode;
  handleAddBtn();
};

//listen products
const handleAddBtn = () => {
  const productBtn = document.querySelectorAll('.js-add-product');
  for (const product of productBtn) {
    product.addEventListener('click', addProduct);
  }
};

const addProduct = (ev) => {
  //id of clicked product
  const clickedId = ev.target.dataset.id;
  //we check if the item its in the cart
  let foundItem;
  for (const item of cart) {
    if (item.id === clickedId) {
      foundItem = item;
    }
  }
  //if not, we found the item
  if (foundItem === undefined) {
    //find clicked product
    let foundProduct;
    for (const product of products) {
      if (product.id === clickedId) {
        foundProduct = product;
      }
    }
    //added the product to the cart
    cart.push({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
      quantity: 1,
    });
  } else {
    //if the item its in the cart we increment the item
    foundItem.quantity += 1;
  }

  paintCartItems();
};

//paint cart items
const cartElement = document.querySelector('.js-cart');

function getCartElement(item) {
  let htmlCode = '';
  htmlCode += `<tr>`;
  htmlCode += `<td>${item.name}</td>`;
  htmlCode += `<td>${item.price}€</td>`;
  htmlCode += `<td>`;
  htmlCode += `<button class ="js-restBtn card__btn">-</button>`;
  htmlCode += `${item.quantity}`;
  htmlCode += `<button class ="js-sumBtn card__btn">+</button>`;
  htmlCode += `</td>`;
  htmlCode += `<td class="text-align-right">${
    item.price * item.quantity
  }€</td>`;
  htmlCode += `</tr>`;
  return htmlCode;
}

function getCartTotalHtmlCode() {
  let htmlCode = '';
  htmlCode += `<tr class"text--bold">`;
  htmlCode += `<td>Total</td>`;
  htmlCode += `<td colspan="3" class="text-align-right">${getTotalPrice()}€</ts>`;
  htmlCode += `</tr>`;
  return htmlCode;
}

function getTotalPrice() {
  let total = 0;
  for (const item of cart) {
    total += item.price * item.quantity;
  }
  return total;
}

function paintCartItems() {
  cartElement.innerHTML = '';
  for (const item of cart) {
    cartElement.innerHTML += getCartElement(item);
  }
  cartElement.innerHTML += getCartTotalHtmlCode();
  //listenCartBtns();
}

paintCartItems();
getApi();
