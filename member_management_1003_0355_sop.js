// 代码生成时间: 2025-10-03 03:55:26
// Define a Member model
var MemberModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "",
        email: ""
    },
    // Validation method to ensure that the name and email are not empty
    validate: function(attrs) {
        if (!attrs.name) {
            return "Name cannot be empty";
        }
        if (!attrs.email) {
            return "Email cannot be empty";
        }
    }
});

// Define a Member collection
var MemberCollection = Backbone.Collection.extend({
    model: MemberModel,
    // Provide a URL to fetch and save the member data
    url: "/api/members"
});

// Define a Member view
var MemberView = Backbone.View.extend({
    // This template will be used to render the member data
    template: _.template("#member-template"),
    events: {
        "click #save-member": "saveMember",
        "click #delete-member": "deleteMember"
    },
    initialize: function() {
        // Bind the render function to the 'change' event of the model
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        // Render the member data using the template
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    saveMember: function() {
        var isValid = this.model.isValid();
        if (isValid) {
            this.model.save(null, {
                success: function(model, response, options) {
                    alert("Member saved successfully");
                },
                error: function(model, xhr, options) {
                    alert("Error saving member: " + xhr.responseText);
                }
            });
        } else {
            alert("Invalid member data");
        }
    },
    deleteMember: function() {
        if (confirm("Are you sure you want to delete this member?")) {
            this.model.destroy({
                success: function(model, response, options) {
                    alert("Member deleted successfully");
                },
                error: function(model, xhr, options) {
                    alert("Error deleting member: " + xhr.responseText);
                }
            });
        }
    }
});

// Initialize the Member Collection
var members = new MemberCollection();

// Fetch the members from the server
members.fetch({
    success: function(collection, response, options) {
        console.log("Members fetched successfully");
    },
    error: function(collection, xhr, options) {
        console.error("Error fetching members: " + xhr.responseText);
    }
});

// Initialize the Member View for each member
_.each(members.models, function(member) {
    new MemberView({ model: member });
});

// Helper function to check if the model is valid
Backbone.Model.prototype.isValid = function() {
    var error = this.validate(this.toJSON());
    return !error;
};

// Template for rendering member data (should be placed in an HTML file with id="member-template")
// <script type="text/template" id="member-template">
//     <h1><%= name %></h1>
//     <p><%= email %></p>
//     <button id="save-member">Save Member</button>
//     <button id="delete-member">Delete Member</button>
// </script>
