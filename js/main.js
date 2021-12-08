'use strict';
const cardsElement = document.querySelector('.js-products');
const userAdress = {};
const adress = document.querySelector('.js-adress');
const city = document.querySelector('.js-city');
const zip = document.querySelector('.js-zip');

const product1 = {
  name: 'Node JS',
  price: 12,
  imgUrl: './images/node-js.jpg',
  quantity: 0,
  decQuantity: decQuantityFunction,
  sumQuantity: sumQuantityFunction,
};

const product2 = {
  name: 'Javascript',
  price: 13,
  imgUrl: './images/javascript.jpg',
  quantity: 0,
  decQuantity: decQuantityFunction,
  sumQuantity: sumQuantityFunction,
};

const product3 = {
  name: 'React',
  price: 15,
  imgUrl: './images/react.jpg',
  quantity: 0,
  decQuantity: decQuantityFunction,
  sumQuantity: sumQuantityFunction,
};

function getProductHtmlCode(product) {
  let htmlCode = `<article class="card">`;
  htmlCode += `<img src="${product.imgUrl}" class="card__img" alt="Camiseta de ${product.name}">`;
  htmlCode += `<h3 class="card__title">${product.name}</h3>`;
  htmlCode += `<p class="card__description">${product.price}€</p>`;
  htmlCode += `<button class="card__btn">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  return htmlCode;
}

function paintProducts() {
  const _product1 = getProductHtmlCode(product1);
  const _product2 = getProductHtmlCode(product2);
  const _product3 = getProductHtmlCode(product3);
  cardsElement.innerHTML = _product1 + _product2 + _product3;
}

paintProducts();

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

function getCartTotalHtmlCode(totalPrice) {
  let htmlCode = '';
  htmlCode += `<tr class"text--bold">`;
  htmlCode += `<td>Total</td>`;
  htmlCode += `<td colspan="3" class="text-align-right">${totalPrice}€</ts>`;
  htmlCode += `</tr>`;
  return htmlCode;
}

function paintCartItems() {
  cartElement.innerHTML = '';
  const totalPrice =
    product1.price * product1.quantity +
    product2.price * product2.quantity +
    product3.price * product3.quantity;
  const item1 = getCartElement(product1);
  const item2 = getCartElement(product2);
  const item3 = getCartElement(product3);
  const total = getCartTotalHtmlCode(totalPrice);
  cartElement.innerHTML = item1 + item2 + item3 + total;
  listenCartBtns();
}

paintCartItems();

function decQuantityFunction() {
  if (this.quantity > 0) {
    this.quantity -= 1;
  }
}

function sumQuantityFunction() {
  this.quantity += 1;
}

function handleQuantity(ev) {
  const currentTarget = ev.currentTarget;
  if (currentTarget.classList.contains('js-sumBtn')) {
    product1.sumQuantity();
  } else {
    product1.decQuantity();
    // product1.quantity -= 1;
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
