'use strict';

const cardsElement = document.querySelector('.js-products');

const product1Name = 'Node JS';
const product1Price = '12';
const product1ImageUrl = './images/node-js.jpg';
let product1Quantity = 1;

const product2Name = 'Javascript';
const product2Price = '13';
const product2ImageUrl = './images/javascript.jpg';
let product2Quantity = 1;

const product3Name = 'Node JS';
const product3Price = '15';
const product3ImageUrl = './images/react.jpg';
let product3Quantity = 1;

function getProductHtmlCode(name, price, imgUrl) {
  let htmlCode = `<article class="card">`;
  htmlCode += `<img src="${imgUrl}" class="card__img" alt="Camiseta de ${name}">`;
  htmlCode += `<h3 class="card__title">${name}</h3>`;
  htmlCode += `<p class="card__description">${price}€</p>`;
  htmlCode += `<button class="card__btn">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  return htmlCode;
}

function paintProducts() {
  const product1 = getProductHtmlCode('Node JS', 12.0, './images/node-js.jpg');
  const product2 = getProductHtmlCode(
    'JavaScript',
    15.0,
    './images/javascript.jpg'
  );
  const product3 = getProductHtmlCode('React', 13.0, './images/react.jpg');
  cardsElement.innerHTML = product1 + product2 + product3;
}

paintProducts();

//paint cart items
const cartElement = document.querySelector('.js-cart');

function getCartElement(name, price, quantity) {
  let htmlCode = '';
  htmlCode += `<tr>`;
  htmlCode += `<td>${name}</td>`;
  htmlCode += `<td>${price}€</td>`;
  htmlCode += `<button class ="js-dec-btn card__btn">-</button>`;
  htmlCode += `${quantity}`;
  htmlCode += `<button class ="js-dec-btn card__btn">+</button>`;
  htmlCode += `</td>`;
  htmlCode += `<td class="text-align-right">${price * quantity}€</td>`;
  htmlCode += `</tr>`;
  return htmlCode;
}

function getCartTotalHtmlCode(totalPrice) {
  let htmlCode = '';
  htmlCode += `<tr class"text--bold">`;
  htmlCode += `<td>Total</td>`;
  htmlCode += `<td colspan="3" class="text-align-right">${totalPrice}€</ts>`;
  htmlCode += `</tr>`;
  return htmlCode;
}

function paintCartItems() {
  const totalPrice =
    product1Price * product1Quantity +
    product2Price * product2Quantity +
    product3Price * product3Quantity;
  const item1 = getCartElement(product1Name, product1Price, product1Quantity);
  const item2 = getCartElement(product2Name, product2Price, product2Quantity);
  const item3 = getCartElement(product3Name, product3Price, product3Quantity);
  const total = getCartTotalHtmlCode(totalPrice);
  cartElement.innerHTML = item1 + item2 + item3 + total;
  listenCartBtns();
}

const restBtn = document.querySelector('.js-rest');
const sumBtn = document.querySelector('.js-sum');

function handleQuantity(ev) {
  const currentTarget = ev.currentTarget;
  if (currentTarget.classList.contains('js-sum')) {
    product1Quantity += 1;
  } else if (product1Quantity > 0) {
    product1Quantity -= 1;
  }
  paintCartItems();
}

// function handleRest1CountBtn() {
//   product1Quantity -= 1;
//   paintCartItems();
// }

sumBtn.addEventListener('click', handleQuantity);
restBtn.addEventListener('click', handleQuantity);

paintCartItems();
