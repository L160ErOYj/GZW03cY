// 代码生成时间: 2025-08-09 07:19:42
// Import necessary libraries
const Backbone = require('backbone');
const crypto = require('crypto');

// Define the HashModel
const HashModel = Backbone.Model.extend({
  // Default values for the model
  defaults: {
    input: '',
    hash: '',
    error: null
  },

  // Validate input to ensure it's not empty
  validate(attrs) {
    if (!attrs.input) {
      return 'Input cannot be empty';
    }
  },

  // Calculate the hash based on the input
  calculateHash() {
    const input = this.get('input');
    const algorithm = 'sha256';
    const hash = crypto.createHash(algorithm).update(input).digest('hex');
    this.set('hash', hash);
  },

  // Clear the hash and error
  clearHash() {
    this.set({
      hash: '',
      error: null
    });
  }
});

// Define the HashView
const HashView = Backbone.View.extend({
  el: '#hash-calculator',

  events: {
    'input #hash-input': 'onInputChange',
    'click #calculate-hash': 'onCalculateClick',
    'click #clear-hash': 'onClearClick'
  },

  initialize() {
    this.model = new HashModel();
    this.listenTo(this.model, 'change', this.render);
  },

  // Render the view based on the model state
  render() {
    const state = this.model.toJSON();
    this.$el.find('#hash-input').val(state.input);
    this.$el.find('#hash-output').text(state.hash);
    this.$el.find('#hash-error').text(state.error);
  },

  // Handle input change
  onInputChange(e) {
    this.model.set('input', e.target.value);
  },

  // Handle calculate hash click
  onCalculateClick() {
    try {
      this.model.clearHash();
      this.model.calculateHash();
      if (this.model.validationError) {
        this.model.set('error', this.model.validationError);
      }
    } catch (error) {
      this.model.set('error', error.message);
    }
  },

  // Handle clear hash click
  onClearClick() {
    this.model.clearHash();
  }
});

// Initialize the application
const hashView = new HashView();

// Ensure the DOM is fully loaded before initializing the view
document.addEventListener('DOMContentLoaded', () => {
  hashView.render();
});
