// 代码生成时间: 2025-09-18 18:09:17
// Define the User model
var UserModel = Backbone.Model.extend({
    defaults: {
        username: '',
        permissions: []
    },
    validate: function(attrs) {
        if (!attrs.username) {
            return 'Username is required';
        }
        if (!attrs.permissions || !Array.isArray(attrs.permissions)) {
            return 'Permissions must be an array';
        }
    }
});

// Define the UserCollection
var UserCollection = Backbone.Collection.extend({
    model: UserModel,
    comparator: 'username'
});

// Define the UserPermissionManager
var UserPermissionManager = Backbone.View.extend({
    el: '#user-permission-manager',
    events: {
        'click #add-user': 'addUser',
        'change #permission-list': 'updatePermissions'
    },
    initialize: function() {
        this.collection = new UserCollection();
        this.listenTo(this.collection, 'add', this.render);
    },
    addUser: function() {
        var username = $('#username').val();
        var permissions = $('#permission-list').val();
        
        if (!username) {
            alert('Please enter a username');
            return;
        }
        
        var newUser = new UserModel({
            username: username,
            permissions: permissions ? permissions.split(',') : []
        });
        
        this.collection.add(newUser, {validate: true});
    },
    updatePermissions: function(event) {
        var username = $(event.target).data('username');
        var newPermissions = $(event.target).val().split(',');
        this.collection.find(function(model) {
            return model.get('username') === username;
        }).set('permissions', newPermissions);
    },
    render: function() {
        this.$el.empty();
        
        this.collection.each(function(user) {
            this.$el.append(`
                <div class='user-permissions'>
                    <h3>${user.get('username')}</h3>
                    <p>Permissions: ${user.get('permissions').join(', ')}</p>
                </div>
            `);
        }, this);
    }
});

// Initialize the application
$(document).ready(function() {
    var userPermissionManager = new UserPermissionManager();
    userPermissionManager.render();
});