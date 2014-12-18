Products = new Mongo.Collection("products");
Cart = new Mongo.Collection("cart");
QRCart = new Mongo.Collection("QRcart");

Router.route('/', function() {
    this.render('home');
});

Router.route('/about');
Router.route('/FAQ');
Router.route('/map');
Router.route('/shop');
Router.route('/cart');
Router.route('/checkout');
Router.route('/QRcart');
Router.route('/payed');
if (Meteor.isClient) {
    // This code only runs on the client
    Template.shop.helpers({
        products: function () {
            return Products.find({}, {sort: {name: 1}});
        }
    });
    Template.cart.helpers({
        cartItems: function () {
            return Cart.find({}, {sort: {name: 1}});
        },
        SubTotal: function () {
            var Items = Cart.find({});
            var Sum = 0;

            Items.forEach(function (Item) {
                Sum += Item.price;
            });
            return Sum;
        },
        cartTotal: function() {
            var Items = Cart.find({});
            var total = 0;
            Items.forEach(function () {
                total ++;
            });
            return total;
        }
    });

    Template.QRcart.helpers({
        QRcartItems: function () {
            return QRCart.find({}, {sort: {name: 1}});
        }
    });
    Template.navbar.helpers({
        cartTotal: function() {
            var Items = Cart.find({});
            var total = 0;
            Items.forEach(function () {
                total ++;
            });
            return total;
        }
    });
    Template.product.events({
        "click .BuyButton": function () {
            if (this.inStock) {
                Cart.insert({name: this.name, price: this.price});
            }
            else
                alert("That item is not in stock");
        }
    });
    Template.cart.events({
        "click .RemoveButton": function () {
            Cart.remove(this._id);
        }
    })
    Template.checkout.events({
        "click .pay": function () {
            Meteor.call('removeAllPosts');
        }
    })
}

if (Meteor.isServer) {
    Meteor.startup(function() {

        return Meteor.methods({

            removeAllPosts: function() {

                return Cart.remove({});

            }

        });

    });

    Products.remove({});
    Cart.remove({});
    QRCart.remove({});
    Products.insert({name: "Shade Coffee", price: 2.50, inStock: true, image:"http://i.imgur.com/s3nQbFK.jpg"});
    Products.insert({name: "FairTrade Coffee", price: 1.25, inStock: true, image:"http://i.imgur.com/navQW4S.jpg"});
    Products.insert({name: "Latte", price: 3.00, inStock: true, image:"http://i.imgur.com/PlEaw1a.jpg"});
    Products.insert({name: "Coffee", price: 1.10, inStock: true, image:"http://i.imgur.com/uktfK50.jpg"});
    QRCart.insert({name: "Shade Coffee", price: 2.50, inStock: true, image:"http://i.imgur.com/s3nQbFK.jpg"})
}