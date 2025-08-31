// 代码生成时间: 2025-09-01 06:38:12
// Include the Backbone.js library
// Make sure Backbone is included in your project before running this script

(function() {
    "use strict";

    // Define the TestData model
    var TestData = Backbone.Model.extend({
        // Model attributes
        defaults: {
            id: null,
            name: "",
            age: null,
            email: ""
        },
        // Validation method
        validate: function(attrs) {
            if (!attrs.name) return "Name is required";
            if (!attrs.email) return "Email is required";
            if (!/\S+@\S+\.\S+/.test(attrs.email)) return "Invalid email address";
            if (!Number.isInteger(attrs.age) || attrs.age < 0) return "Age must be a positive integer";
        }
    });

    // Define the TestDataCollection collection
    var TestDataCollection = Backbone.Collection.extend({
        model: TestData,
        // Optional: Define a URL to fetch data from a server
        // url: '/api/test-data'
    });

    // Create an instance of TestDataCollection
    var testDataCollection = new TestDataCollection();

    // Function to generate test data
    function generateTestData(count) {
        // Check if count is a positive integer
        if (!Number.isInteger(count) || count < 1) {
            console.error("Error: Invalid count. It must be a positive integer.");
            return;
        }

        for (var i = 0; i < count; i++) {
            var testData = new TestData({
                id: i + 1,
                name: "Test User " + (i + 1),
                age: Math.floor(Math.random() * 100) + 1, // Random age between 1 and 100
                email: "test" + (i + 1) + "@example.com"
            });

            // Validate and add to the collection
            if (testData.isValid()) {
                testDataCollection.add(testData);
            } else {
                console.error("Error: Invalid data generated for item " + (i + 1) + ". Skipping...");
            }
        }
    }

    // Function to display test data
    function displayTestData() {
        testDataCollection.each(function(model) {
            console.log(model.toJSON());
        });
    }

    // Example usage: Generate and display 5 test data items
    generateTestData(5);
    displayTestData();

    // Expose the functions for external use
    window.generateTestData = generateTestData;
    window.displayTestData = displayTestData;

})();