import './css/normalize.css';
import './css/style.css';
import $ from 'jquery';
import docStructure from './script/script.js';
import placeholder from './img/placeholder.jpg';

let _ = require('lodash'),
  template = require('./template.html'),
  root = document.getElementById('root'),
  compiled = _.template(template.default),
  compiledStr = compiled({ structure: docStructure });

root.innerHTML = compiledStr;

$(".days-list").on("click", e => {
  let link = $(e.target).closest('.link');
  link = link[0];

  if (!link) return;

  e.preventDefault();

  let listId = link.hash;

  $(listId).slideToggle();

  if (listId.search('products') === 1) {
    $(link).toggleClass("list-prods-arrow");
  } else if (listId.search('operations') === 1) {
    $(link).toggleClass("list-docs-arrow");
  }
});

$('img').on('error', (e) => {
  e.preventDefault();

  $(e.target).attr("src", placeholder);
  $(e.target).addClass('img-placeholder');
})
