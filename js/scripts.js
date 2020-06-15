// Business Logic for ToDoList and Tasks
function ToDoList (){
  this.tasks = [];
  this.currentId = 0;
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignId; 
  this.tasks.push(task);
}

ToDoList.prototype.changeTask = function(taskId, newTask) {
  for (let i=0; i < this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id === taskId) {
        this.tasks[i].task = newTask;
      }
    }
  }
  return false;
}

ToDoList.prototype.deleteTask = function (taskId){
  for (let i=0; i<this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id === taskId) {
        delete this.tasks[i];
        return true;
      }
    }
  }
  return false;
}

function Task (task){
  this.task = task;
  this.isDone = false;
}

$(document).ready(function(){

});