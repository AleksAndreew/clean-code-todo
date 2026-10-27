const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

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

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToCompleted);
  taskInput.value = '';
};

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

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTask = function (listItem, targetHolder, nextHandler) {
  targetHolder.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
};

const moveTaskToCompleted = function () {
  moveTask(this.parentNode, completedTasksHolder, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  moveTask(this.parentNode, incompleteTaskHolder, moveTaskToCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Не addEventListener, чтобы при повторной привязке не накапливались старые обработчики
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Добавляем обработчики к уже существующим задачам
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], moveTaskToCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], moveTaskToIncomplete);
}
