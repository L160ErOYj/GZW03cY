// 代码生成时间: 2025-09-08 08:38:20
// Define the Product Model
var Product = Backbone.Model.extend({
  defaults: {
    name: "",
    quantity: 0,
    price: 0.00
  },
  validate: function(attrs) {
    if (attrs.quantity < 0) {
      return "Quantity cannot be negative";
    }
    if (isNaN(attrs.price) || attrs.price <= 0) {
      return "Price must be a positive number";
    }
  }
});

// Define the Inventory Collection
var Inventory = Backbone.Collection.extend({
  model: Product,
  initialize: function() {
    this.on('add', this.addItem, this);
    this.on('remove', this.removeItem, this);
  },
  addItem: function(model) {
    // Code to add an item to the inventory
    console.log('Item added:', model.get('name'));
  },
  removeItem: function(model) {
    // Code to remove an item from the inventory
    console.log('Item removed:', model.get('name'));
  }
});

// Define the InventoryView
var InventoryView = Backbone.View.extend({
  el: '#inventory',
  events: {
    'click #add-item': 'addItem',
    'click #remove-item': 'removeItem'
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'remove', this.addAll);
  },
  addOne: function(product) {
    var view = new ProductView({ model: product });
    this.$('#products-list').append(view.render().el);
  },
  addAll: function() {
    this.$('#products-list').empty();
    this.collection.each(this.addOne, this);
  },
  addItem: function() {
    // Logic to add a new item to the inventory
  },
  removeItem: function() {
    // Logic to remove an item from the inventory
  }
});

// Define the ProductView
var ProductView = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<%= name %> - <%= quantity %> in stock - $<%= price %>'),
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Initialize the Inventory Collection and View
var inventory = new Inventory();
var inventoryView = new InventoryView({ collection: inventory });

// Example usage: Adding a product to the inventory
var newProduct = new Product({
  name: 'Sample Product',
  quantity: 10,
  price: 19.99
});
inventory.add(newProduct);
