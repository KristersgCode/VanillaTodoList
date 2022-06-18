const taskListElement = document.getElementById("task-list");
const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input");

const taskList = JSON.parse(localStorage.getItem("task_list")) || [];

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const isInTaskList = (elem) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].value === elem) {
      return true;
    }
  }
  return false;
};

const isValidInput = (input) => {
  // Below block is actual if field is not with attribute "required" in HTML
  // if (input === null || input.length === 0) {
  //   alert("Task name can not be empty!");
  //   return false;
  // }
  if (isInTaskList(input)) {
    alert("Task already exists!");
    return false;
  }
  return true;
};

const renderTask = () => {
  let counter = 0;
  const taskListElementArray = taskList.map(
    (task) =>
      `<div class="flex"><li data-id="${counter++}" class="${
        task.done ? "done" : null
      }">${
        task.value
      }</li><button class="remove"><i class="fa-solid fa-trash fa-lg"></i></button></div>`
  );
  taskListElement.innerHTML = taskListElementArray.join("");
};

const addTask = (e) => {
  if (!inputField.validity.valid) {
    // Stop code execution if HTML "required" validation failed
    return;
  }
  e.preventDefault();
  if (!isValidInput(inputField.value.trim())) {
    return;
  }
  const inputValue = inputField.value.trim();
  taskList.push({ value: inputValue, done: false });
  saveToLocalStorage("task_list", taskList);
  inputField.value = "";
  renderTask();
};

const toggleDone = (e) => {
  if (e === null) {
    return;
  }
  let clickedLiIndex;
  if (e.srcElement.localName === "li") {
    // Complete done toggle

    clickedLiIndex = e.target.getAttribute("data-id");
    taskList[clickedLiIndex].done = !taskList[clickedLiIndex].done;
  } else {
    // Complete task removing

    clickedLiIndex = e.target.parentElement.getAttribute("data-id");
    taskList.splice(clickedLiIndex, 1);
  }
  saveToLocalStorage("task_list", taskList);
  renderTask();
};

// Listeners
addButton.addEventListener("click", addTask);
taskListElement.addEventListener("click", toggleDone);

renderTask();
