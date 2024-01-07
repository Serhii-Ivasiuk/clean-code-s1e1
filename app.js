const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".btn_add");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
    const listItem = document.createElement("li");
    listItem.className = "todo-list__item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "todo-list__checkbox";

    const label = document.createElement("label");
    label.innerText = taskString;
    label.className = "todo-list__label";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo-list__input";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "btn btn_edit edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn_delete delete";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-roledescription", "Remove todo");

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "btn__icon";

    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

const addTask = function () {
    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".todo-list__input");
    const label = listItem.querySelector(".todo-list__label");
    const editBtn = listItem.querySelector(".btn_edit");
    const containsClass = listItem.classList.contains("todo-list__item_edit");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("todo-list__item_edit");
};

const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
};

const taskCompleted = function () {
    const listItem = this.parentNode;
    const label = listItem.querySelector(".todo-list__label");

    label.classList.add("todo-list__label_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
    const listItem = this.parentNode;
    const label = listItem.querySelector(".todo-list__label");

    label.classList.remove("todo-list__label_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
    console.log("AJAX Request");
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".todo-list__checkbox");
    const editButton = taskListItem.querySelector(".btn_edit");
    const deleteButton = taskListItem.querySelector(".btn_delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}