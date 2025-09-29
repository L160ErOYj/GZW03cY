// 代码生成时间: 2025-09-30 03:05:26
// Require Backbone and Underscore
const Backbone = require('backbone');
const _ = require('underscore');

// Define a Model for lazy-loaded images
const LazyImageModel = Backbone.Model.extend({
  // Default attributes
  defaults: {
    src: '',
    placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    alt: ''
  }
});

// Define a Collection for lazy-loaded images
const LazyImageCollection = Backbone.Collection.extend({
  model: LazyImageModel,

  // A function to load images in the viewport
  loadVisibleImages: function() {
    this.each((model, index) => {
      // Get the image element
      const img = document.querySelector(model.get('src'));
      if (!img) {
        console.error('Image element not found for src:', model.get('src'));
        return;
      }

      // Check if the image is in the viewport
      if (this.isInViewport(img)) {
        // If it's in the viewport, load the image
        img.src = model.get('src');
        // Remove the placeholder source
        img.srcset = '';
        // Remove the image from the collection
        this.remove(model);
      }
    });
  },

  // Helper function to check if an element is in the viewport
  isInViewport: function(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
  },

  // Bind the scroll event to load images
  bindEvents: function() {
    window.addEventListener('scroll', () => this.loadVisibleImages(), false);
    window.addEventListener('resize', () => this.loadVisibleImages(), false);
  }
});

// Create an instance of the LazyImageCollection
const lazyImages = new LazyImageCollection();

// Initialize the lazy-loading process
const initLazyLoading = () => {
  // Find all images with the 'lazy-load' class and add them to the collection
  const lazyLoadImages = document.querySelectorAll('img.lazy-load');
  _.each(lazyLoadImages, (img) => {
    lazyImages.add({
      src: img.dataset.src,
      placeholder: img.dataset.placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      alt: img.alt
    });
  });

  // Bind the scroll and resize events to load images when they enter the viewport
  lazyImages.bindEvents();
};

// Run the initialization when the window loads
window.addEventListener('load', initLazyLoading, false);
