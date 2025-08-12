// 代码生成时间: 2025-08-13 00:49:44
(function($, Backbone) {

  // Define a new FormValidator model
  var FormValidator = Backbone.Model.extend({

    // Default validation rules
    defaults: {
      required: [],
      minLength: [],
      maxLength: [],
      pattern: []
    },

    // Validate the model's data against the rules
    validate: function(data) {
      var errors = [];

      // Check required fields
      _.each(this.get('required'), function(field) {
        if (!data[field] || data[field] === '') {
          errors.push('Field ' + field + ' is required.');
        }
      });

      // Check minimum length
      _.each(this.get('minLength'), function(length, field) {
        if (data[field] && data[field].length < length) {
          errors.push('Field ' + field + ' must be at least ' + length + ' characters long.');
        }
      });

      // Check maximum length
      _.each(this.get('maxLength'), function(length, field) {
        if (data[field] && data[field].length > length) {
          errors.push('Field ' + field + ' must not exceed ' + length + ' characters.');
        }
      });

      // Check pattern (regular expression)
      _.each(this.get('pattern'), function(regex, field) {
        if (data[field] && !data[field].match(new RegExp(regex))) {
          errors.push('Field ' + field + ' does not match the required pattern.');
        }
      });

      if (errors.length > 0) {
        this.trigger('invalid', errors);
        return errors;
      }
    }
  });

  // Expose FormValidator to the global scope
  window.FormValidator = FormValidator;

})($, Backbone);

// Usage example:
//
// var validator = new FormValidator({
//   required: ['username', 'password'],
//   minLength: {
//     'username': 5,
//     'password': 8
//   },
//   maxLength: {
//     'username': 20,
//     'password': 30
//   },
//   pattern: {
//     'username': '^[a-zA-Z0-9]+$' // Only letters and numbers
//   }
// });
//
// var formData = {
//   username: 'user',
//   password: 'pass'
// };
//
// var errors = validator.validate(formData);
// if (errors) {
//   console.log('Validation errors:', errors);
// } else {
//   console.log('Form data is valid.');
// }