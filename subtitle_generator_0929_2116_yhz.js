// 代码生成时间: 2025-09-29 21:16:48
// Include Backbone.js library
// Make sure to include the Backbone.js library in your HTML file before this script

(function() {

  // Define the Subtitle model
  var SubtitleModel = Backbone.Model.extend({
    // Model attributes
    defaults: {
      startTime: '',
      endTime: '',
      content: ''
    },

    // Validation for the model
    validate: function(attrs) {
      if (attrs.startTime >= attrs.endTime) {
        return 'Start time must be before end time';
      }
      if (!attrs.content) {
        return 'Subtitle content cannot be empty';
      }
    }
  });

  // Define the SubtitleCollection
  var SubtitleCollection = Backbone.Collection.extend({
    model: SubtitleModel
  });

  // Define the View for the Subtitle Generator
  var SubtitleLabelView = Backbone.View.extend({
    el: '#subtitle-generator',

    events: {
      'click #generate': 'generateSubtitles'
    },

    initialize: function() {
      this.collection = new SubtitleCollection();
      this.listenTo(this.collection, 'add', this.addOne, this);
    },

    // Add a single subtitle to the view
    addOne: function(subtitle) {
      this.$el.append(
        '<li>' +
        '<p>Start: ' + subtitle.get('startTime') + '</p>' +
        '<p>End: ' + subtitle.get('endTime') + '</p>' +
        '<p>Content: ' + subtitle.get('content') + '</p>' +
        '</li>'
      );
    },

    // Generate subtitles based on user input
    generateSubtitles: function() {
      var startTime = this.$('#start-time').val();
      var endTime = this.$('#end-time').val();
      var content = this.$('#content').val();

      // Create a new subtitle model
      var subtitle = new SubtitleModel({
        startTime: startTime,
        endTime: endTime,
        content: content
      });

      // Try to add the subtitle to the collection
      try {
        this.collection.add(subtitle);
      } catch (error) {
        console.error('Error adding subtitle:', error);
        alert(error);
      }
    }
  });

  // Initialize the view on document ready
  $(document).ready(function() {
    var subtitleLabelView = new SubtitleLabelView();
  });

})();