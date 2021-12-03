'use strict';

const cardsElement = document.querySelector('.js-cards');

function getProductHtmlCode(name, price, imgUrl) {
  let htmlCode = `<article class="card">`;
  htmlCode += `<img src="${imgUrl}" class="card__img" alt="Camiseta de ${name}">`;
  htmlCode += `<h3 class="card__title">${name}</h3>`;
  htmlCode += `<p class="card__description">${price}€</p>`;
  htmlCode += `<button class="card__btn">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  return htmlCode;
}

function paintPorducts() {
  const product1 = getProductHtmlCode('Node JS', 12.0, './images/node-js.jpg');
  const product2 = getProductHtmlCode(
    'JavaScript',
    15.0,
    './images/javascript.jpg'
  );
  const product3 = getProductHtmlCode('React', 13.0, './images/react.jpg');
  cardsElement.innerHTML = product1 + product2 + product3;
}

paintPorducts();
