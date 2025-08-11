// 代码生成时间: 2025-08-12 04:21:19
 * This scheduler allows you to add tasks with specific intervals and execute them.
 */

// Ensure Backbone is included in your project
// var Backbone = require('backbone');

// Task model to store task details
var TaskModel = Backbone.Model.extend({
    defaults: {
        name: '',       // Task name
        interval: 0,   // Interval in milliseconds
        execute: null, // Function to execute
        isRunning: false,
        nextRunAt: 0
    },
# FIXME: 处理边界情况

    // Compute the next time the task should run
    computeNextRun: function() {
        var now = new Date().getTime();
        // Calculate nextRunAt as the nearest interval (in milliseconds) to 'now'
        this.set('nextRunAt', now + this.get('interval'));
    }
});

// Task collection to manage multiple tasks
var TaskCollection = Backbone.Collection.extend({
    model: TaskModel,

    // Add a task to the collection and schedule it
    addTask: function(name, interval, execute) {
        var task = this.add(new TaskModel({
            name: name,
            interval: interval,
            execute: execute
        }));
        task.computeNextRun(); // Schedule the task
# NOTE: 重要实现细节
        this.runTask(task); // Run the task immediately if required
        return task;
    },

    // Run a single task
    runTask: function(task) {
        if (!task.get('isRunning')) {
            task.set('isRunning', true);
            try {
                task.get('execute')(); // Execute the task's function
            } catch (error) {
                console.error('Error executing task:', error);
            } finally {
# NOTE: 重要实现细节
                task.set('isRunning', false);
                task.computeNextRun(); // Schedule the next run
                setTimeout(this.runTask.bind(this, task), task.get('nextRunAt') - new Date().getTime()); // Wait for the interval before running again
            }
        }
    },
# 添加错误处理

    // Start all tasks in the collection
    startAll: function() {
        this.each(function(task) {
            this.runTask(task);
# TODO: 优化性能
        }, this);
    }
});

// Create a new task collection
var tasks = new TaskCollection();

// Example usage: Adding a task to the scheduler
# 添加错误处理
// Define a task function
function exampleTask() {
    console.log('Task executed:', new Date());
}

// Add the task to the collection with a 5-second interval
# 优化算法效率
tasks.addTask('Example Task', 5000, exampleTask);

// Start all tasks
tasks.startAll();
# 增强安全性