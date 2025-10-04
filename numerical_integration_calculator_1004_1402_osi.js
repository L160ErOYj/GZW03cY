// 代码生成时间: 2025-10-04 14:02:51
 * Numerical Integration Calculator using JavaScript and Backbone.js
 *
 * @author Your Name
 * @version 1.0.0
 */

// Define a Backbone Model to hold the function details for integration
var FunctionModel = Backbone.Model.extend({
  /*
   * Initialize the model with default values
   */
  defaults: {
    function: 'x^2',  // Default function to be integrated
    lowerLimit: 0,    // Default lower limit of integration
    upperLimit: 1,    // Default upper limit of integration
    numIntervals: 100 // Default number of intervals for integration
  },

  /*
   * Validate the input parameters
   */
  validate: function(attrs) {
    if (attrs.function === undefined) {
      return 'Function cannot be undefined';
    }
    if (!(attrs.lowerLimit >= 0 && attrs.upperLimit >= 0 && attrs.upperLimit >= attrs.lowerLimit)) {
      return 'Invalid limits, ensure lowerLimit and upperLimit are non-negative and upperLimit is greater than lowerLimit';
    }
    if (!(attrs.numIntervals > 0)) {
      return 'Number of intervals must be a positive integer';
    }
  }
});

// Define a Backbone View to handle the user interface
var IntegrationCalculatorView = Backbone.View.extend({
  el: '#integrationCalculator',
  initialize: function() {
    this.model = new FunctionModel();
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'input #functionInput': 'updateFunction',
    'input #lowerLimitInput': 'updateLowerLimit',
    'input #upperLimitInput': 'updateUpperLimit',
    'input #numIntervalsInput': 'updateNumIntervals',
    'click #calculateButton': 'calculateIntegration'
  },
  updateFunction: function(e) {
    this.model.set({ function: e.target.value });
  },
  updateLowerLimit: function(e) {
    this.model.set({ lowerLimit: parseFloat(e.target.value) });
  },
  updateUpperLimit: function(e) {
    this.model.set({ upperLimit: parseFloat(e.target.value) });
  },
  updateNumIntervals: function(e) {
    this.model.set({ numIntervals: parseInt(e.target.value, 10) });
  },
  calculateIntegration: function() {
    var fn = this.model.get('function');
    var lowerLimit = this.model.get('lowerLimit');
    var upperLimit = this.model.get('upperLimit');
    var numIntervals = this.model.get('numIntervals');

    try {
      var result = numericalIntegration(fn, lowerLimit, upperLimit, numIntervals);
      this.displayResult(result);
    } catch (error) {
      this.displayError(error.message);
    }
  },
  displayResult: function(result) {
    $('#result').text('Result: ' + result.toFixed(4));
  },
  displayError: function(message) {
    $('#result').text('Error: ' + message);
  },
  render: function() {
    // Render the current state of the model to the view
    $('#functionInput').val(this.model.get('function'));
    $('#lowerLimitInput').val(this.model.get('lowerLimit'));
    $('#upperLimitInput').val(this.model.get('upperLimit'));
    $('#numIntervalsInput').val(this.model.get('numIntervals'));
  }
});

// Numerical integration function using the trapezoidal rule
function numericalIntegration(fn, a, b, n) {
  var h = (b - a) / n;
  var sum = 0;
  var x = a;

  for (var i = 0; i < n; i++) {
    sum += (eval(fn) + eval(fn.replace(/x/g, (x + h)))) / 2;
    x += h;
  }

  return sum * h;
}

// Initialize the application
$(document).ready(function() {
  var calculator = new IntegrationCalculatorView();
});
