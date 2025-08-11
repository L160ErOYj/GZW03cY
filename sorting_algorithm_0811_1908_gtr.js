// 代码生成时间: 2025-08-11 19:08:55
// Using Backbone Model to represent the data
var SortingModel = Backbone.Model.extend({
    defaults: {
        array: []
    },
    
    // Add a new element to the array
    addNumber: function(number) {
        this.set('array', this.get('array').concat(number));
    },
    
    // Sort the array using a specified algorithm
    sort: function(algorithm) {
        try {
            switch (algorithm) {
                case 'bubbleSort':
                    return this.bubbleSort();
                case 'quickSort':
                    return this.quickSort(this.get('array'));
                case 'mergeSort':
                    return this.mergeSort(this.get('array'));
                default:
                    throw new Error('Unknown sorting algorithm.');
            }
        } catch (error) {
            console.error('Sorting error:', error.message);
            return null;
        }
    },
    
    // Bubble Sort Algorithm
    bubbleSort: function() {
        var array = this.get('array');
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        return array;
    },
    
    // Quick Sort Algorithm
    quickSort: function(array) {
        if (array.length <= 1) return array;
        var left = [], right = [], pivot = array[0];
        for (var i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }
        return this.quickSort(left).concat([pivot], this.quickSort(right));
    },
    
    // Merge Sort Algorithm
    mergeSort: function(array) {
        if (array.length <= 1) return array;
        var middle = Math.floor(array.length / 2),
            left = array.slice(0, middle),
            right = array.slice(middle);
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    },
    
    // Merge function for Merge Sort
    merge: function(left, right) {
        var result = [], leftIndex = 0, rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex++]);
            } else {
                result.push(right[rightIndex++]);
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
});

// Example usage
var sortingModel = new SortingModel();
sortingModel.addNumber(3);
sortingModel.addNumber(1);
sortingModel.addNumber(4);
sortingModel.addNumber(1);

// Sort using bubble sort
var sortedArray = sortingModel.sort('bubbleSort');
console.log('Sorted Array:', sortedArray);
