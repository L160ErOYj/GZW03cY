// 代码生成时间: 2025-09-11 07:23:05
 * This system manages user permissions and provides an interface to
 * check and modify permissions.
 */

// Define the User model
var User = Backbone.Model.extend({
  // User model with permissions
  defaults: function() {
    return {
      username: '',
      permissions: []
    };
  },
  // Helper method to add a permission
  addPermission: function(permission) {
    this.get('permissions').push(permission);
    this.set({ permissions: this.get('permissions') });
  },
  // Helper method to remove a permission
  removePermission: function(permission) {
    this.set({ permissions: this.get('permissions').filter(p => p !== permission) });
  },
  // Helper method to check if the user has a specific permission
  hasPermission: function(permission) {
    return this.get('permissions').includes(permission);
  }
});

// Define the User Collection
var Users = Backbone.Collection.extend({
  model: User
});

// Define the Permission Manage View
var PermissionManageView = Backbone.View.extend({
  el: '#permission-system',
  events: {
    'click .add-permission': 'addPermission',
    'click .remove-permission': 'removePermission',
    'click .check-permission': 'checkPermission'
  },
  initialize: function() {
    // Bind this view to the user collection
    this.users = new Users();
    this.listenTo(this.users, 'add remove', this.render);
  },
  addPermission: function(event) {
    event.preventDefault();
    var username = $(event.target).data('username');
    var permission = $(event.target).data('permission');
    var user = this.users.findWhere({ username: username });
    if (user) {
      user.addPermission(permission);
    } else {
      console.error('User not found');
    }
  },
  removePermission: function(event) {
    event.preventDefault();
    var username = $(event.target).data('username');
    var permission = $(event.target).data('permission');
    var user = this.users.findWhere({ username: username });
    if (user) {
      user.removePermission(permission);
    } else {
      console.error('User not found');
    }
  },
  checkPermission: function(event) {
    event.preventDefault();
    var username = $(event.target).data('username');
    var permission = $(event.target).data('permission');
    var user = this.users.findWhere({ username: username });
    if (user) {
      var hasPermission = user.hasPermission(permission);
      alert('User ' + username + ' has permission: ' + permission + ' - ' + hasPermission);
    } else {
      console.error('User not found');
    }
  },
  render: function() {
    // Render the user permissions
    this.$el.empty();
    this.users.each(function(user) {
      var userPermissions = user.get('permissions').join(', ');
      this.$el.append(
        $('<div>').append(
          $('<p>').text(user.get('username') + ' - ' + userPermissions)
        )
      );
    }, this);
  },
  addNewUser: function(username, permissions) {
    var newUser = new User({ username: username, permissions: permissions });
    this.users.add(newUser);
  }
});

// Initialize the system
var permissionSystem = new PermissionManageView();
permissionSystem.addNewUser('john_doe', ['read', 'write']);
permissionSystem.addNewUser('jane_doe', ['read']);
permissionSystem.render();
