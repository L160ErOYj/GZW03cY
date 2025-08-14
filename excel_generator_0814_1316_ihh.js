// 代码生成时间: 2025-08-14 13:16:04
// Import necessary libraries
const Backbone = require('backbone');
const ExcelJS = require('exceljs');

// Define the ExcelGenerator Model
const ExcelGeneratorModel = Backbone.Model.extend({
  // Model attributes
  defaults: {
    sheetName: 'Sheet1',
    data: [],
    fileName: 'GeneratedExcel.xlsx',
    path: 'path/to/directory/'
  },

  // Validate data before saving
  validate(attrs) {
    if (!attrs.sheetName) return 'Sheet name is required';
    if (!attrs.data.length) return 'Data is required';
    if (!attrs.fileName) return 'File name is required';
    if (!attrs.path) return 'Path is required';
  },

  // Generate Excel file
  generateExcel() {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(this.get('sheetName'));
      this.get('data').forEach((row, index) => {
        worksheet.addRow(row);
      });

      // Save the Excel file to the specified path
      workbook.xlsx.writeFile(this.get('path') + this.get('fileName'));
      console.log('Excel file generated successfully');
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  }
});

// Usage example
const excelGenerator = new ExcelGeneratorModel({
  sheetName: 'Sales Data',
  data: [
    ['Date', 'Product', 'Quantity', 'Price'],
    ['2024-01-01', 'Widget', 10, 19.99],
    ['2024-01-02', 'Gadget', 20, 15.99]
  ],
  fileName: 'SalesReport.xlsx',
  path: './'
});

// Validate the model and generate the Excel file
if (excelGenerator.isValid()) {
  excelGenerator.generateExcel();
} else {
  console.error('Validation failed:', excelGenerator.validationError);
}