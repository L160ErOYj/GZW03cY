// 代码生成时间: 2025-09-30 19:15:51
// Include the Backbone library
var Backbone = require('backbone');

// Define the Model for ConversionRate
var ConversionRate = Backbone.Model.extend({
  // Model attributes
  defaults: {
    percentage: 0,
    startDate: '',
    endDate: ''
  },

  // Initialize method
  initialize: function() {
    this.on('invalid', function(model, error) {
      console.error(error);
    });
  },

  // Validate the input data
  validate: function(attrs) {
    if (attrs.percentage < 0 || attrs.percentage > 100) {
      return 'Percentage must be between 0 and 100';
    }
    if (attrs.startDate > attrs.endDate) {
      return 'Start date must be before end date';
    }
  }
});

// Define the Collection for ConversionRate
var ConversionRates = Backbone.Collection.extend({
  model: ConversionRate,
  comparator: 'percentage'
});

// Define the View for displaying Conversion Rates
var ConversionRateView = Backbone.View.extend({
  tagName: 'div',
  template: _.template('<% _.each(rates, function(rate) { %> <div>Conversion Rate: <%= rate.get('percentage') %>%</div> <% }); %>'),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var data = {
      rates: this.model.toJSON()
    };
    this.$el.html(this.template(data));
    return this;
  }
});

// Entry point of the application
var app = {
  start: function() {
    try {
      // Create a new instance of the model
      var conversionRate = new ConversionRate({
        percentage: 15,
        startDate: '2023-01-01',
        endDate: '2023-01-31'
      });

      // Create a new instance of the collection
      var conversionRates = new ConversionRates([conversionRate]);

      // Create a new instance of the view
      var conversionRateView = new ConversionRateView({
        el: '#app',
        model: conversionRates
      });

      // Render the view
      conversionRateView.render();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

// Run the application
app.start();