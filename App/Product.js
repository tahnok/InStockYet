'use strict';

class product {
  constructor(product, productUrl) {
    this.product = product;
    this.productUrl = productUrl;
  }

  inStock() {
    var inStock = false;
    for(var i = 0; i < this.product.variants.length; i++) {
      if(this.product.variants[i].inventory_quantity > 0) {
        inStock = true;
        break;
      }
    }
    return inStock;
  }
}

function isValid(productUrl) {
  var urlPattern = new RegExp(/^https?:\/\/(?:[a-z\d])(?:[\w-]+\.?)+(?:\.[a-z]{2,})(?:\/[\w-]+)+[^\/]$/);
  return urlPattern.test(productUrl);
}

function get(productUrl) {
  return fetch(productUrl + '.json')
  .then((response) => response.json())
  .then((responseData) => {
    return new product(responseData.product, productUrl);
  });
}

module.exports = {
  product,
  get,
  isValid,
};
