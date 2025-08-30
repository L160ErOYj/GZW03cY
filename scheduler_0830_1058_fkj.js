// 代码生成时间: 2025-08-30 10:58:48
 * It allows you to schedule tasks to run at specific intervals or after a delay.
 *
 * @author Your Name
 * @version 1.0
 */

(function(Backbone, _, $, undefined) {"use strict";

  // Define a Task model
  var TaskModel = Backbone.Model.extend({
    defaults: {
      taskName: "",
      interval: 0, // In milliseconds
      callback: function() {},
      lastRun: null
    },
    
    // Initialize the task model
    initialize: function() {
      this.set('lastRun', new Date());
    },
    
    // Run the task
    runTask: function() {
      this.get('callback')();
      this.set('lastRun', new Date());
    }
  });

  // Define a Scheduler collection
  var Scheduler = Backbone.Collection.extend({
    model: TaskModel,
    
    // Add a new task to the scheduler
    scheduleTask: function(taskName, interval, callback) {
      var task = this.findWhere({taskName: taskName});
      if (task) {
        // Update existing task
        task.set({interval: interval, callback: callback});
      } else {
        // Create a new task
        this.add(new TaskModel({
          taskName: taskName,
          interval: interval,
          callback: callback
        }));
      }
    },
    
    // Start the scheduler
    start: function() {
      this.each(function(task) {
        var interval = task.get('interval');
        if (interval > 0) {
          setInterval(task.runTask.bind(task), interval);
        } else {
          console.error("Invalid interval for task '" + task.get('taskName') + "': " + interval);
        }
      });
    }
  });

  // Expose the Scheduler to the global scope
  window.Scheduler = Scheduler;

})(window.Backbone, window._, window.jQuery);