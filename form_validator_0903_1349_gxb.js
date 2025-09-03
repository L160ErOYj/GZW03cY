// 代码生成时间: 2025-09-03 13:49:48
(function($, Backbone) {
  // Define the FormValidator model
  var FormValidatorModel = Backbone.Model.extend({
    // Default validation rules
    defaults: {
      username: {
        required: true,
        regex: /^[a-zA-Z0-9_]+$/
      },
      email: {
        required: true,
        regex: /^[^@]+@[^@]+\.[^@]+/
      },
      password: {
        required: true,
        minLength: 6
      }
    },
    // Validate a single field
    validateField: function(fieldName, value) {
      var fieldRules = this.get(fieldName);
      if (!fieldRules) {
        throw new Error('Validation rules for field ' + fieldName + ' not defined.');
      }
      if (fieldRules.required && !value) {
        return 'This field is required.';
      }
      if (fieldRules.regex && !fieldRules.regex.test(value)) {
        return 'Invalid format for ' + fieldName + '.';
      }
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        return 'Password must be at least ' + fieldRules.minLength + ' characters long.';
      }
      return null; // No error
    },
    // Validate the entire form
    validateForm: function() {
      var errors = {};
      this.each(function(rules, fieldName) {
        var error = this.validateField(fieldName, this.get(fieldName));
        if (error) {
          errors[fieldName] = error;
        }
      }, this);
      return errors;
    }
  });

  // Usage
  // Create a new instance of FormValidatorModel
  var formValidator = new FormValidatorModel();

  // You can define custom validation rules by setting them on the model
  // For example, to add a custom rule for a 'phone' field:
  // formValidator.set('phone', {
  //   required: true,
  //   regex: /^\d{10}$/
  // });

  // Validate a form when it's submitted
  // $('#myForm').submit(function(event) {
  //   event.preventDefault();
  //   var errors = formValidator.validateForm();
  //   if (!_.isEmpty(errors)) {
  //     // Handle errors, e.g., by displaying them next to the form fields
  //     // ...
  //   } else {
  //     // Form is valid, proceed with form submission logic
  //     // ...
  //   }
  // });

})(jQuery, Backbone);