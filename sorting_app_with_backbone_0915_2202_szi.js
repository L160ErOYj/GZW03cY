// 代码生成时间: 2025-09-15 22:02:28
// Defining a Backbone Model for our sorting data
var SortingModel = Backbone.Model.extend({
    defaults: {
        numbers: []
    },
    // Method to sort the numbers using insertion sort algorithm
    insertionSort: function() {
        var numbers = this.get('numbers');
        for (var i = 1; i < numbers.length; i++) {
            var key = numbers[i];
            var j = i - 1;
            while (j >= 0 && numbers[j] > key) {
                numbers[j + 1] = numbers[j];
                j = j - 1;
            }
            numbers[j + 1] = key;
        }
        this.set('numbers', numbers);
    },
    // Method to sort the numbers using bubble sort algorithm
    bubbleSort: function() {
        var numbers = this.get('numbers');
        for (var i = 0; i < numbers.length; i++) {
            for (var j = 0; j < numbers.length - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    var temp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = temp;
                }
            }
        }
        this.set('numbers', numbers);
    }
});

// Defining a Backbone View for our sorting app
var SortingView = Backbone.View.extend({
    el: '#sorting-app',
    events: {
        'click #sort-insertion': 'insertionSort',
        'click #sort-bubble': 'bubbleSort'
    },
    initialize: function() {
        this.model = new SortingModel({
            numbers: [5, 3, 8, 4, 2]
        });
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        var sortedNumbers = this.model.get('numbers').join(', ');
        this.$el.find('#result').text('Sorted Numbers: ' + sortedNumbers);
    },
    insertionSort: function() {
        this.model.insertionSort();
    },
    bubbleSort: function() {
        this.model.bubbleSort();
    }
});

// Initialize the app
var sortingView = new SortingView();

// Ensuring the DOM is fully loaded before initializing the app
$(document).ready(function() {
    // You can add your HTML and CSS to support the sorting app here
    // For example:
    // $('#sorting-app').html('<button id="sort-insertion">Sort by Insertion</button><button id="sort-bubble">Sort by Bubble</button><div id="result"></div>');
});