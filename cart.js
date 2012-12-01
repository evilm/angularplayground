function Product(sku, name, price) {
    this.sku = sku;
    this.name = name;
    this.price = price;
}




function LineItem(product, number) {
    this.product = product;
    this.number = number;
}

LineItem.prototype.totalPrice = function () {
  return this.product.price * this.number;
};




function Cart(lineItems) {
  this.lineItems = lineItems;
}

Cart.prototype.totalNumber = function () {
  var result = 0;
  this.lineItems.forEach(function (lineItem) {
    result += lineItem.number;
  });
  return result;
};

Cart.prototype.totalPrice = function () {
  var result = 0;
  this.lineItems.forEach(function (lineItem) {
    result += lineItem.totalPrice();
  });
  return result;
};

Cart.prototype.add = function (product) {
    this.lineItems.forEach(function (lineItem) {
        if (lineItem.product === product) {
            ++lineItem.number;
            product = null;
        }
    });
    if (product) {
        this.lineItems.push(new LineItem(product, 1));
    }
};

Cart.prototype.remove = function (index) {
    this.lineItems.splice(index, 1);
};




function CartCtrl($scope) {
  $scope.catalog = [
    new Product('1234', 'Nexus 7 16GB', 199),
    new Product('5678', 'Nexus 10 32GB', 399),
    new Product('9101', 'Nexus 4 Bumper', 3.99)
  ];
  $scope.cart = new Cart([]);
}
