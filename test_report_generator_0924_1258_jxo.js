// 代码生成时间: 2025-09-24 12:58:18
// Including Backbone.js library
define([
    'backbone',
    'underscore'
], function (Backbone, _) {

    // TestResult Model
    var TestResult = Backbone.Model.extend({
        defaults: {
            testId: '',
            testName: '',
            testResult: '',
            testMessage: ''
        },

        // Validate the test result data
        validate: function (attrs) {            
            if (!attrs.testId) {
                return 'Test ID is required';
            }
            if (!attrs.testName) {
                return 'Test Name is required';
            }
            if (!attrs.testResult) {
                return 'Test Result is required';
            }
        }
    });

    // TestSuite Collection
    var TestSuite = Backbone.Collection.extend({
        model: TestResult,

        // Find tests by test name
        findByTestName: function (testName) {
            return this.where({testName: testName});
        },

        // Generate report
        generateReport: function () {
            try {
                var report = {
                    success: 0,
                    failures: 0,
                    errors: []
                };

                // Iterate through the test results
                this.each(function (testResult) {
                    if (testResult.get('testResult') === 'pass') {
                        report.success++;
                    } else {
                        report.failures++;
                        report.errors.push({
                            testId: testResult.get('testId'),
                            testName: testResult.get('testName'),
                            message: testResult.get('testMessage')
                        });
                    }
                });

                return JSON.stringify(report, null, 2); // Format the report as a JSON string
            } catch (error) {
                console.error('Error generating report:', error.message);
                return null;
            }
        }
    });

    // Public API
    return {
        TestResult: TestResult,
        TestSuite: TestSuite
    };

});