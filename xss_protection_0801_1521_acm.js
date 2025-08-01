// 代码生成时间: 2025-08-01 15:21:35
(function(root, factory) {
  // Set up Backbone appropriately using module systems.
  if (typeof define === 'function' && define.amd) {
    define(["backbone", "jquery"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require("backbone"), require("jquery"));
  } else {
    root.XSSProtection = factory(root.Backbone, root.jQuery);
  }
}(this, function(Backbone, $) {

  "use strict";

  // XSS Protection Function
  function sanitizeContent(content) {
    try {
      // Use a simple whitelist approach to sanitize content
      // Remove all tags except for a safe subset
      content = $('<div>' + content + '</div>').text();
    } catch (error) {
      // Handle any errors during sanitization
      console.error("Error sanitizing content: ", error);
    }
    return content;
  }

  // Extend Backbone's Model to include XSS protection
  var XSSProtectedModel = Backbone.Model.extend({
    defaults: {
      content: ""
    },
    // Sanitize content when setting it
    set: function(key, value, options) {
      if (_.isObject(key) || _.isArray(key)) {
        _.each(key, function(val, attr) {
          if (attr === "content") {
            key[attr] = sanitizeContent(val);
          }
        });
      } else {
        if (key === "content") {
          value = sanitizeContent(value);
        }
      }
      return Backbone.Model.prototype.set.call(this, key, value, options);
    }
  });

  // Return the model that includes XSS protection
  return XSSProtectedModel;
}));