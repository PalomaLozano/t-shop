'use strict';

const cardsElement = document.querySelector('.js-products');
const userAdress = {};
const adress = document.querySelector('.js-adress');
const city = document.querySelector('.js-city');
const zip = document.querySelector('.js-zip');
let products = [];

//fetch
function getApiCart() {
  fetch('https://beta.adalab.es/ejercicios-extra/api/eshop/v1/cart.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      products = data.cart.items;
      paintProducts();
      paintCartItems();
    });
}

getApiCart();

function getProductHtmlCode(product) {
  let htmlCode = `<article class="card">`;
  htmlCode += `<img src="${product.imageUrl}" class="card__img" alt="Camiseta de ${product.name}">`;
  htmlCode += `<h3 class="card__title">${product.name}</h3>`;
  htmlCode += `<p class="card__description">${product.price}€</p>`;
  htmlCode += `<button class="card__btn">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  return htmlCode;
}

function paintProducts() {
  let htmlCode = '';
  for (const product of products) {
    htmlCode += getProductHtmlCode(product);
  }
  cardsElement.innerHTML = htmlCode;
}

//paintProducts();

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

//paintCartItems();

function decQuantity(product) {
  if (product.quantity > 0) {
    product.quantity -= 1;
  }
}

function sumQuantity(product) {
  product.quantity += 1;
}

function handleQuantity(ev) {
  const currentTarget = ev.currentTarget;
  //let product = 0;
  if (currentTarget.classList.contains('js-sumBtn')) {
    sumQuantity(products[0]);
  } else {
    decQuantity(products[0]);
  }

  paintCartItems();
}

function listenCartBtns() {
  const restBtn = document.querySelector('.js-restBtn');
  restBtn.addEventListener('click', handleQuantity);

  const sumBtn = document.querySelector('.js-sumBtn');
  sumBtn.addEventListener('click', handleQuantity);
}

//adress

function handleAdress(ev) {
  const name = ev.currentTarget.name;
  userAdress[name] = ev.currentTarget.value;
  // console.log(userAdress);
}

adress.addEventListener('keyup', handleAdress);
city.addEventListener('keyup', handleAdress);
zip.addEventListener('keyup', handleAdress);
