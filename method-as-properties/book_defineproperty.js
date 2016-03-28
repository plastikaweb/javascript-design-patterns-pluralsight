/**
 * Created by plastik on 27/3/16.
 */
'use strict';

var Book = function (name, price) {
    var priceChanging = [],
      priceChanged = [];

    Object.defineProperty(this, 'name', {
        get: function () {
            return name;
        },
        set: function (val) {
            name = val || '';
        }
    });

    Object.defineProperty(this, 'price', {
        get: function () {
            return price;
        },
        set: function (val) {
            var i;
            if (val !== price) {
                for (i = 0; i < priceChanging.length; i++) {
                    if (!priceChanging[i](val)) {
                        return false;
                    }
                }
                price = val || 0;
                for (i = 0; i < priceChanged.length; i++) {
                    priceChanged[i](this);
                }
            }
        }
    });

    this.onPriceChanging = function (callback) {
        priceChanging.push(callback);
    };

    this.onPriceChanged = function (callback) {
        priceChanged.push(callback);
    };
};

var book = new Book('Javascript, the goods parts', 23.99);

book.onPriceChanging(function (price) {
    console.log('trying to change the price to ' + price + ', wait a moment...');
    return true;
});
book.onPriceChanging(function (price) {
    if (price > 100) {
        console.log('Error, price too high');
        return false;
    }
    return true;
});
book.onPriceChanged(function (b) {
    console.log('The book price has changed to: $' + b.price);
});

console.log(book.name);
console.log(book.price);

book.price = 23;
book.price = 223;