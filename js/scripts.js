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
      if (this.tasks[i].id == taskId) {
        return this.tasks[i];
      }
    }
  }
  return false;
}

ToDoList.prototype.taskIsDone = function(taskId) {
  if(this.findTask(taskId)) {
    this.findTask(taskId).isDone = true;
  }
  return false;
}

ToDoList.prototype.changeTask = function(taskId, newTask) {
  for (let i=0; i < this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == taskId) {
        return this.tasks[i].task = newTask;
      }
    }
  }
  return false;
}

ToDoList.prototype.deleteTask = function(taskId){
  for (let i=0; i<this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == taskId) {
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
    if(task.isDone) {
      htmlForTasksInfo += '<li class="done" id=' + task.id + ">" + task.task + "</li>";
    } else {
      htmlForTasksInfo += "<li id=" + task.id + ">" + task.task + "</li>";
    }
    htmlForTasksInfo += "<button class='doneButton' id=" + task.id + '><i class="fa fa-check"></i></button>';
    htmlForTasksInfo += "<button class='modifyButton' id=" + task.id + '><i class="fa fa-pencil"></i></button>';
    htmlForTasksInfo += "<button class='deleteButton' id=" + task.id + '><i class="fa fa-trash"></i></button>';
  });
  tasksList.html(htmlForTasksInfo);  
}

function attachTaskListeners() {
  $("ul#tasks").on("click", ".deleteButton", function() {
    toDoList.deleteTask(this.id);   
    displayTasks(toDoList);
  });
  $("ul#tasks").on("click", ".doneButton", function() {
    toDoList.taskIsDone(this.id);
    $("li#"+this.id).addClass("done");
  });
  $("ul#tasks").on("click", ".modifyButton", function() {
    let modifyTask = prompt("Change your task");
    $("li#"+this.id).text(toDoList.changeTask(this.id, modifyTask));
  });
};

$(document).ready(function(){
  attachTaskListeners();
  $("form").submit(function(event) {
    event.preventDefault();
    let inputtedTask = $("input#task").val();
    let task = new Task(inputtedTask);
    toDoList.addTask(task);
    $("input#task").val("");
    displayTasks(toDoList);
    $(".tasks").show();
  });
});