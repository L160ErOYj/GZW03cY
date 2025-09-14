// 代码生成时间: 2025-09-14 20:59:30
 * Features:
 * - Add items to cart
 * - Remove items from cart
 * - Update item quantity
 * - Calculate total price
 */

// Define a model for CartItem
var CartItem = Backbone.Model.extend({
  defaults: {
    id: null,
    name: "",
    price: 0,
    quantity: 1
  },
  // Calculate the total price for the item
  totalPrice: function() {
    return this.get('price') * this.get('quantity');
  }
});

// Define a collection for Cart
var Cart = Backbone.Collection.extend({
  model: CartItem,
  // Calculate the total price for all items in the cart
  totalPrice: function() {
    return this.reduce(function(total, item) {
      return total + item.totalPrice();
    }, 0);
  },
  // Add an item to the cart
  addItem: function(itemData) {
    var item = this.findWhere({ id: itemData.id });
    if (item) {
      item.set('quantity', item.get('quantity') + 1);
    } else {
      this.add(new CartItem(itemData));
    }
  },
  // Remove an item from the cart
  removeItem: function(itemId) {
    var item = this.findWhere({ id: itemId });
    if (item) {
      this.remove(item);
    } else {
      throw new Error('Item not found');
    }
  },
  // Update item quantity
  updateQuantity: function(itemId, quantity) {
    var item = this.findWhere({ id: itemId });
    if (item) {
      item.set('quantity', quantity);
    } else {
      throw new Error('Item not found');
    }
  }
});

// Initialize the cart
var cart = new Cart();

// Example usage:
try {
  // Add items
  cart.addItem({ id: 1, name: 'Apple', price: 1.00 });
  cart.addItem({ id: 2, name: 'Banana', price: 0.50 });

  // Update quantity
  cart.updateQuantity(1, 2);

  // Remove an item
  cart.removeItem(2);

  // Calculate total price
  console.log('Total price: $' + cart.totalPrice().toFixed(2));
} catch (error) {
  console.error('An error occurred:', error.message);
}