// 代码生成时间: 2025-09-04 02:51:16
// Define the Todo model
var Todo = Backbone.Model.extend({
  // Model attributes
  defaults: {
    title: "",
    completed: false
  },
  // Toggle the completed state of the todo item
  toggle: function() {
    this.save({completed: !this.get("completed")});
  }
});

// Define the TodoCollection collection
var TodoCollection = Backbone.Collection.extend({
  model: Todo
});

// Define the TodoView view
var TodoView = Backbone.View.extend({
  tagName:  "li",
  template: _.template("<%= title %><button class='toggle'>Toggle</button>"),

  events: {
    "click .toggle": "toggleCompleted"
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));
    return this;
  },

  toggleCompleted: function() {
    this.model.toggle();
  }
});

// Define the AppView view
var AppView = Backbone.View.extend({
  el: "#app",
  events: {
    "keypress #new-todo": "createOnEnter",
    "click #toggle-all": "toggleAllComplete"
  },

  initialize: function() {
    this.allCheckbox = this.$("#toggle-all")[0];
    this.$input = this.$('#new-todo');
    this.todos = new TodoCollection;
    this.inputListener();
  },

  inputListener: function() {
    this.$input.on('keypress', (e) => {
      if (e.which === 13) {
        this.createTodo();
      }
    });
  },

  createTodo: function() {
    var value = this.$input.val().trim();
    if (value) {
      this.todos.create({title: value});
      this.$input.val('');
    }
  },

  createOnEnter: function(e) {
    if (e.which === 13) {
      this.createTodo();
    }
  },

  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    this.todos.each(function(todo) {
      todo.save({completed: completed});
    });
  },

  render: function() {
    this.$input.focus();
    this.$('#todo-list').empty();
    this.todos.each(function(todo) {
      var todoView = new TodoView({model: todo});
      this.$('#todo-list').append(todoView.render().el);
    }, this);
  }
});

$(document).ready(function() {
  var appView = new AppView;
  appView.render();
});
