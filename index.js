let taskCount = 2;
let totalTaskCount = document.getElementById("test");
let taskInput = document.getElementById("add-task"); // add new-task
let incompleteTasksList = document.getElementById("incomplete-tasks"); //list of incomplete task
let completeTasksList = document.getElementById("completed-tasks"); //list of complete task
let emptyList = document.getElementById("no-list-display"); //empty list
let addButton = document.getElementById("add-button-id"); // disable add button

totalTaskCount.innerText = 2; //default task count.

// This function will create new list item and return that item.
let createNewElement = function (taskString) {
  // create new list item
  let listItem = document.createElement("li");
  // input checkbox
  let checkBox = document.createElement("input");
  // label
  let label = document.createElement("label");
  // delete button
  let deleteButton = document.createElement("button");
  checkBox.type = "checkBox";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  // append each element in node.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  return listItem;
};

//Add new task in list.
var addTask = function () {
  //Create a new list item.
  var listItem = createNewElement(taskInput.value);

  //Add listItem to incompleteTaskList
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  //clearing the input field value.
  taskInput.value = "";

  //increment list counter when list added to list and setting its value.
  taskCount = taskCount + 1;
  totalTaskCount.innerText = taskCount;

  // hide show functionality for todo list.
  if (taskCount > 0) {
    document.getElementById("all-task-wrapper").className =
      "displayVisibleList";
    emptyList.innerHTML = "";
    addButton.setAttribute("disabled", "");
  }
};

//Delete an existing task
var deleteTask = function () {
  //Remove the list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);

  //decrease total list count when item is deleted from list
  taskCount = taskCount - 1;
  totalTaskCount.innerText = taskCount;

  //when list is empty, it will show message.
  if (taskCount == 0) {
    document.getElementById("all-task-wrapper").className = "displayList";
    emptyList.innerHTML = "No todos to display..!! Please add todos";
  }
};

//This event will occcurs when key is pressed on first input field.
var keypressEvent = function () {
  addButton.removeAttribute("disabled");
};

//Task complete.
var taskCompleted = function () {
  //When the checkbox is checked, Append the task list item to completed list.
  var listItem = this.parentNode;
  completeTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Task incomplete.

var taskIncomplete = function () {
  //When the checkbox is unchecked, Append the task list item to incompleted list.
  var listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Add event handler to addTask function.
addButton.addEventListener("click", addTask);
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksList.children.length; i++) {
  //bind events to list item's children for taskCompleted
  bindTaskEvents(incompleteTasksList.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completeTasksList.children.length; i++) {
  //bind events to list item's children for task inCompleted
  bindTaskEvents(completeTasksList.children[i], taskIncomplete);
}
