// 代码生成时间: 2025-08-03 17:25:10
// Including Backbone.js library
// Make sure to include Backbone.js in your project for this to work

(function() {

  // Define a Message model
  var MessageModel = Backbone.Model.extend({
    defaults: {
      title: "",
      body: "",
      timestamp: new Date()
    },

    validate: function(attrs) {
      if (!attrs.title || !attrs.body) {
        return "Message must have a title and a body";
      }
    },

    // Add any additional methods for the Message model here
  });

  // Define a collection of Messages
  var MessageCollection = Backbone.Collection.extend({
    model: MessageModel
  });

  // Define a View to handle the UI
  var NotificationView = Backbone.View.extend({
    el: '#notification-container',

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
    },

    addOne: function(message) {
      // Render a single message
      var messageView = new MessageView({ model: message });
      this.$el.append(messageView.render().el);
    },

    addAll: function() {
      // Add all messages to the view
      this.$el.empty();
      this.collection.each(this.addOne, this);
    },

    // Add any additional methods for the NotificationView here
  });

  // Define a View for each Message
  var MessageView = Backbone.View.extend({
    tagName: 'li',
    className: 'notification-item',
    template: _.template('<%= title %> - <%= body %> <span><%= timestamp %></span>'),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Add any additional methods for the MessageView here
  });

  // Initialize the application
  var initialize = function() {
    var messages = new MessageCollection();
    var notification = new NotificationView({ collection: messages });

    // Example of adding a message to the notification system
    messages.create({
      title: 'New Notification',
      body: 'This is a sample message.',
      timestamp: new Date()
    });
  };

  // Start the application when the DOM is ready
  $(document).ready(initialize);

})();