// 代码生成时间: 2025-08-03 07:44:34
// Require necessary libraries
const JSZip = require('jszip');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

// Define the FileExtractor Model to encapsulate file decompression logic
const FileExtractorModel = Backbone.Model.extend({
  // Initialize the model with file path and destination path
  initialize: function(options) {
    this.filePath = options.filePath;
    this.destinationPath = options.destinationPath;
  },

  // Decompress the file
  decompress: function() {
    return new Promise((resolve, reject) => {
      // Read the file
      fs.readFile(this.filePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        
        // Use JSZip to decompress the file
        JSZip.loadAsync(data).then(zip => {
          // Extract to destination path
          zip.forEach((relativePath, zipEntry) => {
            zipEntry.async('nodebuffer').then(content => {
              const fileName = path.basename(zipEntry.name);
              const targetPath = path.join(this.destinationPath, fileName);
              
              // Write the content to the destination path
              fs.writeFile(targetPath, content, error => {
                if (error) throw error;
              });
            });
          }).then(() => {
            resolve('Files have been successfully decompressed.');
          }).catch(error => {
            reject(error);
          });
        }, error => {
          reject(error);
        });
      });
    });
  }
});

// Define the FileExtractorView to handle user interaction and display results
const FileExtractorView = Backbone.View.extend({
  el: '#fileExtractor',

  events: {
    'change #fileInput': 'onFileChange',
    'click #decompressButton': 'decompressFile'
  },

  initialize: function() {
    this.model = new FileExtractorModel({
      filePath: '',
      destinationPath: ''
    });
  },

  onFileChange: function(event) {
    this.model.set('filePath', event.target.files[0].path);
  },

  decompressFile: function() {
    const { filePath } = this.model.attributes;
    const destinationPath = this.$('#destinationInput').val();
    this.model.set('destinationPath', destinationPath);
    
    this.model.decompress().then(message => {
      alert(message);
    }).catch(error => {
      console.error('An error occurred:', error);
      alert('Failed to decompress file.');
    });
  }
});

// Initialize the view when the document is ready
$(document).ready(function() {
  new FileExtractorView();
});