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
  task.id = this.assignId(); 
  this.tasks.push(task);
}

ToDoList.prototype.findTask = function(taskId) {
  for (let i=0; i < this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id === taskId) {
        return this.tasks[i];
      }
    }
  }
  return false;
}

ToDoList.prototype.changeTask = function(taskId, newTask) {
  for (let i=0; i < this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id === taskId) {
        this.tasks[i].task = newTask;
        return true;
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

Task.prototype.taskDone = function () {
  this.isDone = true;
}

//UI Logic
let toDoList = new ToDoList();

function displayTasks(toDoListToDisplay){
  let tasksList = $("ul#tasks");
  let htmlForTasksInfo = "";
  toDoListToDisplay.tasks.forEach(function(task) {
    htmlForTasksInfo += "<li id=" + task.id + ">" + task.task + "</li>" + "<button class='deleteButton' id=" + task.id + ">Delete</button>";
  });
  tasksList.html(htmlForTasksInfo);  
}

function attachTaskListeners() {
  $("ul#tasks").on("click", ".deleteButton", function() {
    toDoList.deleteTask(this.id);
    console.log(toDoList);
    displayTasks(toDoList);
  });
};

$(document).ready(function(){
  attachTaskListeners();
  $("form").submit(function(event) {
    event.preventDefault();
    //$("ul#tasks").children().remove();
    let inputtedTask = $("input#task").val();
    if(!inputtedTask) {
      alert("Please input your task");
      return;
    } 
    let task = new Task(inputtedTask);
    toDoList.addTask(task);
    $("input#task").val("");
    /*toDoList.tasks.forEach(function(element) {
      $("ul#tasks").append("<li>" + element.task + "</li>");
    });
    $(".to-dos").show();*/
    displayTasks(toDoList);
  });
});