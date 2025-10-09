// 代码生成时间: 2025-10-09 21:00:01
// game_resource_manager.js
// Backbone框架实现的游戏资源管理器

// 定义一个资源模型，表示单个游戏资源
var ResourceModel = Backbone.Model.extend({
    defaults: {
        name: "",
        quantity: 0,
        type: ""
    },
    validate: function(attrs) {
        if (!attrs.name) {
            return "Name is required";
        }
        if (attrs.quantity < 0) {
            return "Quantity cannot be negative";
        }
    }
});

// 定义资源集合，管理所有游戏资源
var ResourceCollection = Backbone.Collection.extend({
    model: ResourceModel,
    comparator: 'name'
});

// 定义资源管理器，用于添加、删除和搜索资源
var ResourceManager = Backbone.View.extend({
    el: '#game-resources',
    events: {
        'click #add-resource': 'addResource',
        'click #remove-resource': 'removeResource'
    },
    initialize: function() {
        this.collection = new ResourceCollection();
        this.listenTo(this.collection, 'add remove reset', this.render.bind(this));
    },
    addResource: function() {
        var resourceName = this.$('input[name="resource-name"]').val();
        var resourceQuantity = parseInt(this.$('input[name="resource-quantity"]').val(), 10);
        var resourceType = this.$('select[name="resource-type"]').find(':selected').text();
        
        if (!resourceName) {
            alert('Resource name is required.');
            return;
        }
        
        var resource = new ResourceModel({
            name: resourceName,
            quantity: resourceQuantity,
            type: resourceType
        });
        
        this.collection.add(resource);
    },
    removeResource: function() {
        var selectedResourceId = this.$('select[name="selected-resource"]').find(':selected').val();
        
        if (selectedResourceId) {
            this.collection.get(selectedResourceId).destroy();
        } else {
            alert('Please select a resource to remove.');
        }
    },
    render: function() {
        this.$('.resource-list').empty();
        this.collection.each(function(resource) {
            this.$('.resource-list').append('<li>' + resource.get('name') + ' - ' + resource.get('quantity') + ' - ' + resource.get('type') + '</li>');
        }, this);
    }
});

// 初始化资源管理器
var resourceManager = new ResourceManager();