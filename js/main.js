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
  console.log('Evento', ev.target, ev.target.dataset);
};

getApi();
