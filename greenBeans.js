Products = new Mongo.Collection("products");
Cart = new Mongo.Collection("cart");

Router.route('/', function() {
    this.render('home');
});

Router.route('/productList');
Router.route('/cart');
if (Meteor.isClient) {
    // This code only runs on the client
    Template.productList.helpers({
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
                Sum += Item.Price;
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
        "click .btn": function () {
            if (this.InStock) {
                Cart.insert({Name: this.Name, Price: this.Price});
            }
            else
                alert("That item is not in stock");
        }
    });
    Template.cart.events({
        "click .btn": function () {
            Cart.remove(this._id);
        }
    })
}

if (Meteor.isServer) {
    Products.remove({});
    Cart.remove({});
    Products.insert({Name: "Shade Coffee", Price: 2.5, InStock: true});
    Products.insert({Name: "FairTrade Coffee", Price: 2, InStock: true});
    Products.insert({Name: "Regular Coffee", Price: 1.5, InStock: false});
}