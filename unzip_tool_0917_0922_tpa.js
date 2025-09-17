// 代码生成时间: 2025-09-17 09:22:41
(function() {
  // Ensure the Backbone library is loaded
  var Backbone = window.Backbone || require('backbone');

  // UnzipModel to handle the unzipping logic
  var UnzipModel = Backbone.Model.extend({
    // Default attributes for the model
    defaults: {
      file: null,
      outputDirectory: null,
      progress: 0,
      status: 'pending'
    },

    // Method to unzip a file
    unzipFile: function(file, outputDirectory) {
      this.set({
        file: file,
        outputDirectory: outputDirectory,
        status: 'unzipping'
      });

      // Check if the file is provided
      if (!file) {
        this.set({ status: 'error', error: 'No file provided' });
        return;
      }

      // Check if the output directory is provided
      if (!outputDirectory) {
        this.set({ status: 'error', error: 'No output directory provided' });
        return;
      }

      // Use the JSZip library to unzip the file
      // Note: You need to include JSZip in your project
      var zip = new JSZip();
      zip.loadAsync(file)
        .then(function(zip) {
          // Extract the zip file to the specified directory
          return zip.folder('archive/').filter(function(relativePath, file) {
            return file.dir;
          }).reduce(function(previous, dir) {
            return previous.then(function() {
              return dir.folder(relativePath).generateNodeStream({
                streamFiles: true,
                decodeContent: true
              }).pipe(
                fs.createWriteStream(path.join(outputDirectory, relativePath))
              );
            }), function() {}
          }, Promise.resolve());
        })
        .then(function() {
          this.set({ status: 'completed' });
        }.bind(this))
        .catch(function(error) {
          this.set({ status: 'error', error: error.message });
        }.bind(this));
    }
  });

  // UnzipView to handle the UI and user interactions
  var UnzipView = Backbone.View.extend({
    el: '#unzip-container',

    events: {
      'change #file-input': 'handleFileSelect',
      'click #unzip-button': 'unzipFile'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    handleFileSelect: function(e) {
      var files = e.target.files;
      if (files.length) {
        this.model.set('file', files[0]);
      }
    },

    unzipFile: function() {
      var file = this.model.get('file');
      var outputDirectory = this.$('#output-directory').val();
      this.model.unzipFile(file, outputDirectory);
    },

    render: function() {
      this.$el.find('#status').text(this.model.get('status'));
      this.$el.find('#progress').width(this.model.get('progress') + '%');
    }
  });

  // Instantiate the UnzipModel and UnzipView
  var unzipModel = new UnzipModel();
  var unzipView = new UnzipView({ model: unzipModel });
})();
