// 代码生成时间: 2025-09-20 02:54:17
// Define the Process model
var ProcessModel = Backbone.Model.extend({
    // Model defaults
    defaults: {
        name: "",
        status: "inactive",
        priority: 1
    },

    // Validation method to ensure process has a name and status
    validate: function(attrs) {
        if (!attrs.name) {
            return "Process must have a name";
        }
        if (!attrs.status) {
            return "Process must have a status";
        }
    }
});

// Define the Process collection
var ProcessCollection = Backbone.Collection.extend({
    model: ProcessModel,
    // Comparator function to sort processes by priority
    comparator: function(process) {
        return process.get('priority');
    }
});

// Define the ProcessManager view
var ProcessManagerView = Backbone.View.extend({
    el: '#processManager',
    events: {
        'click #addProcess': 'addProcess',
        'click .process': 'toggleProcess'
    },
    initialize: function() {
        this.collection = new ProcessCollection();
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
    },
    addOne: function(process) {
        var view = new ProcessView({ model: process });
        this.$('#processList').append(view.render().el);
    },
    addAll: function() {
        this.$('#processList').empty();
        this.collection.each(this.addOne, this);
    },
    addProcess: function() {
        var name = this.$('#processName').val();
        var status = this.$('#processStatus').val();
        var priority = parseInt(this.$('#processPriority').val(), 10) || 1;
        
        if (!name) {
            alert('Please enter a process name.');
            return;
        }
        
        var newProcess = new ProcessModel({ name: name, status: status, priority: priority });
        
        try {
            newProcess.save();
            this.collection.add(newProcess);
        } catch (error) {
            console.error('Error adding process:', error);
        }
    },
    toggleProcess: function(event) {
        var processId = $(event.currentTarget).data('id');
        var process = this.collection.get(processId);
        if (process) {
            var newStatus = process.get('status') === 'active' ? 'inactive' : 'active';
            process.set('status', newStatus);
            process.save();
        }
    },
    render: function() {
        this.$('#processList').empty();
        this.addAll();
        return this;
    }
});

// Define the Process view
var ProcessView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#processTemplate').html()),
    events: {
        'click': 'toggleProcessStatus'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.data('id', this.model.cid);
        return this;
    },
    toggleProcessStatus: function() {
        var newStatus = this.model.get('status') === 'active' ? 'inactive' : 'active';
        this.model.set('status', newStatus);
        this.model.save();
        this.render();
    }
});

// Initialize the application
$(document).ready(function() {
    var processManager = new ProcessManagerView();
    processManager.render();
});

// HTML Template for Process View
// <script type="text/template" id="processTemplate">
//     <span><%= name %> [Priority: <%= priority %>] - Status: <%= status %></span>
// </script>