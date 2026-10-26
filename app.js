const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('incomplete-tasks'); //ul of #incomplete-tasks
const completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//Create new task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  taskLabel.innerText = taskString;
  taskLabel.className = 'task';

  checkBox.type = 'checkbox';

  editInput.type = 'text';
  editInput.className = 'task';
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

//Add new task to the incomplete tasks list
const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToCompleted);
  taskInput.value = '';
};

//Edit an existing task.
const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('edit-mode');
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('edit-mode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

//Move task to the completed list
const moveTaskToCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToIncomplete);
};

//Append the task list item to the #incomplete-tasks.
const moveTaskToIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToCompleted);
};

// Adds a task when the Add button is clicked
addButton.addEventListener('click', addTask);

// Add event handlers
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Incomplete tasks should move to completed when checked
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], moveTaskToCompleted);
}

// Completed tasks should move back to incomplete when unchecked
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], moveTaskToIncomplete);
}
