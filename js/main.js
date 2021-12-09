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
  htmlCode += `<button class="js-add-product card__btn id="${product.id}">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
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
  console.log(clickedId);
  //find clicked product
  let foundProduct;

  for (const product of products) {
    if (product.id === clickedId) {
      foundProduct = product;
    }
  }
  //add product to the cart
  cart.push({
    id: foundProduct.id,
    name: foundProduct.name,
    price: foundProduct.price,
    quantity: 1,
  });
  paintCartItems();
};

//paint cart items
const cartElement = document.querySelector('.js-cart');

function getCartElement(product) {
  let htmlCode = '';
  htmlCode += `<tr>`;
  htmlCode += `<td>${product.name}</td>`;
  htmlCode += `<td>${product.price}€</td>`;
  htmlCode += `<td>`;
  htmlCode += `<button class ="js-restBtn card__btn">-</button>`;
  htmlCode += `${product.quantity}`;
  htmlCode += `<button class ="js-sumBtn card__btn">+</button>`;
  htmlCode += `</td>`;
  htmlCode += `<td class="text-align-right">${
    product.price * product.quantity
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

function paintCartItems() {
  cartElement.innerHTML = '';
  for (const cart of products) {
    cartElement.innerHTML += getCartElement(cart);
  }
  cartElement.innerHTML += getCartTotalHtmlCode();
  listenCartBtns();
}

function getTotalPrice() {
  let total = 0;
  for (const product of products) {
    total += product.price * product.quantity;
  }
  return total;
}

getApi();
