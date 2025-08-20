// 代码生成时间: 2025-08-21 07:35:20
// Define the DataModel to store individual data points.
var DataModel = Backbone.Model.extend({
  defaults: {
    value: null,
    timestamp: null
  },
  validate: function(attrs) {
    if (attrs.value === undefined || attrs.timestamp === undefined) {
      return 'Value and timestamp are required';
    }
  }
});

// Define the DataCollection to manage a collection of DataModels.
var DataCollection = Backbone.Collection.extend({
  model: DataModel,
  url: '/api/data', // This should be replaced with the actual URL to fetch data.

  // Fetch data from the server and add it to the collection.
  fetchData: function() {
    this.fetch({
      success: function(collection, response, options) {
        console.log('Data fetched successfully:', response);
      },
      error: function(collection, response, options) {
        console.error('Error fetching data:', response);
      }
    });
  },

  // Calculate mean of the data values.
  calculateMean: function() {
    var sum = this.reduce(function(memo, model) {
      return memo + model.get('value');
    }, 0);
    return this.isEmpty() ? 0 : sum / this.length;
  },

  // Calculate median of the data values.
  calculateMedian: function() {
    var values = this.map(function(model) {
      return model.get('value');
    }).sort(function(a, b) { return a - b; });
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
      return values[half];
    return (values[half - 1] + values[half]) / 2.0;
  },

  // Calculate standard deviation of the data values.
  calculateStdDev: function() {
    var mean = this.calculateMean();
    var variance = this.reduce(function(memo, model) {
      var value = model.get('value');
      return memo + Math.pow(value - mean, 2);
    }, 0) / this.length;
    return Math.sqrt(variance);
  }
});

// Initialize the DataCollection and fetch data.
var dataCollection = new DataCollection();
dataCollection.fetchData();

// Example usage:
// console.log('Mean:', dataCollection.calculateMean());
// console.log('Median:', dataCollection.calculateMedian());
// console.log('Standard Deviation:', dataCollection.calculateStdDev());
