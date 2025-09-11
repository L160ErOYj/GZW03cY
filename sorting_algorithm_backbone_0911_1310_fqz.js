// 代码生成时间: 2025-09-11 13:10:48
class SortingAlgorithmView extends Backbone.View {

    // Constructor for the view
    constructor(options) {
        super(options);
        this.el = '#sorting-algorithm-container';
        this.render();
    }

    // Render method to display the sorting algorithm interface
    render() {
        // Render the sorting algorithm interface
        $(this.el).html(`
            <h2>Sorting Algorithm Demonstration</h2>
            <button id='bubble-sort'>Bubble Sort</button>
            <button id='selection-sort'>Selection Sort</button>
            <button id='insertion-sort'>Insertion Sort</button>
            <div id='array-display'></div>
        `);
    }

    // Initialize events for the sorting buttons
    events() {
        return {
            'click #bubble-sort': 'bubbleSort',
            'click #selection-sort': 'selectionSort',
            'click #insertion-sort': 'insertionSort',
        };
    }

    // Bubble Sort algorithm implementation
    bubbleSort() {
        try {
            const array = this.generateRandomArray();
            this.displayArray(array);
            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < array.length - 1; i++) {
                    if (array[i] > array[i + 1]) {
                        this.swap(array, i, i + 1);
                        swapped = true;
                    }
                }
            } while (swapped);
            this.displayArray(array);
        } catch (error) {
            console.error('Error during bubble sort:', error);
        }
    }

    // Selection Sort algorithm implementation
    selectionSort() {
        try {
            const array = this.generateRandomArray();
            this.displayArray(array);
            for (let i = 0; i < array.length - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
                }
                this.swap(array, i, minIndex);
            }
            this.displayArray(array);
        } catch (error) {
            console.error('Error during selection sort:', error);
        }
    }

    // Insertion Sort algorithm implementation
    insertionSort() {
        try {
            const array = this.generateRandomArray();
            this.displayArray(array);
            for (let i = 1; i < array.length; i++) {
                let key = array[i];
                let j = i - 1;
                while (j >= 0 && array[j] > key) {
                    array[j + 1] = array[j];
                    j--;
                }
                array[j + 1] = key;
            }
            this.displayArray(array);
        } catch (error) {
            console.error('Error during insertion sort:', error);
        }
    }

    // Helper method to generate a random array
    generateRandomArray() {
        const length = 20;
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
            array[i] = Math.floor(Math.random() * 100) + 1;
        }
        return array;
    }

    // Helper method to display the array in the UI
    displayArray(array) {
        $('#array-display').html(array.join(' '));
    }

    // Helper method to swap elements in the array
    swap(array, index1, index2) {
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
}

// Create an instance of SortingAlgorithmView
const sortingAlgorithmView = new SortingAlgorithmView();