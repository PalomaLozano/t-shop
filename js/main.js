'use strict';

const product1 = {
  name: 'Node JS',
  price: 12,
  imgUrl: './images/node-js.jpg',
  quantity: 0,
};

const product2 = {
  name: 'Javascript',
  price: 13,
  imgUrl: './images/javascript.jpg',
  quantity: 0,
};

const product3 = {
  name: 'React',
  price: 15,
  imgUrl: './images/react.jpg',
  quantity: 0,
};

const cardsElement = document.querySelector('.js-products');

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
  htmlCode += `<button class ="js-restBtn1 js-restBtn2 js-restBtn3 card__btn">-</button>`;
  htmlCode += `${product.quantity}`;
  htmlCode += `<button class ="js-sumBtn1 js-sumBtn2 js-sumBtn3 card__btn">+</button>`;
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

function handleQuantity(ev) {
  const currentTarget = ev.currentTarget;
  if (currentTarget.classList.contains('js-sumBtn1')) {
    product1.quantity += 1;
    currentTarget.classList.remove('js-sumBtn2', 'js-sumBtn3');
  } else if (product1.quantity > 0) {
    product1.quantity -= 1;
    currentTarget.classList.remove('js-restBtn2', 'js-restBtn3');
  }

  // if (currentTarget.classList.contains('js-sumBtn2')) {
  //   product2.quantity += 1;
  // } else if (product2.quantity > 0) {
  //   product2.quantity -= 1;
  // }

  // if (currentTarget.classList.contains('js-sumBtn3')) {
  //   product3.quantity += 1;
  // } else if (product3.quantity > 0) {
  //   product3.quantity -= 1;
  // }

  paintCartItems();
}

function handleQuantity2(ev) {
  const currentTarget2 = ev.currentTarget;
  if (currentTarget2.classList.contains('js-sumBtn2')) {
    product2.quantity += 1;
    currentTarget2.classList.remove('js-sumBtn1', 'js-sumBtn3');
  } else if (product2.quantity > 0) {
    product2.quantity -= 1;
    currentTarget2.classList.remove('js-restBtn1', 'js-restBtn3');
  }
  paintCartItems();
}

function handleQuantity3(ev) {
  const currentTarget3 = ev.currentTarget;
  if (currentTarget3.classList.contains('js-sumBtn3')) {
    product3.quantity += 1;
    currentTarget3.classList.remove('js-sumBtn1', 'js-sumBtn2');
  } else if (product3.quantity > 0) {
    product3.quantity -= 1;
    currentTarget3.classList.remove('js-restBtn1', 'js-restBtn2');
  }
  paintCartItems();
}

function listenCartBtns() {
  const restBtn = document.querySelector('.js-restBtn1');
  restBtn.addEventListener('click', handleQuantity);

  const sumBtn = document.querySelector('.js-sumBtn1');
  sumBtn.addEventListener('click', handleQuantity);

  const restBtn2 = document.querySelector('.js-restBtn2');
  restBtn2.addEventListener('click', handleQuantity2);

  const sumBtn2 = document.querySelector('.js-sumBtn2');
  sumBtn2.addEventListener('click', handleQuantity2);

  const restBtn3 = document.querySelector('.js-restBtn3');
  restBtn3.addEventListener('click', handleQuantity3);

  const sumBtn3 = document.querySelector('.js-sumBtn3');
  sumBtn3.addEventListener('click', handleQuantity3);
}
