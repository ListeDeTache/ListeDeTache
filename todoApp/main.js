setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let seconds = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.querySelector(".s").innerText = seconds;
  document.querySelector(".m").innerText = m;
  document.querySelector(".h").innerText = h;
}, 1000);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("newTaskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, archived: false });
  saveTasks();
  input.value = "";
  render();
}

function toggleArchive(index) {
  tasks[index].archived = !tasks[index].archived;
  saveTasks();
  render();
}

// delete
function deleteTask(index) {
  if (confirm("Do you really want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    render();
  }
}

// edit
function editTask(index) {
  const newText = prompt("Edit the task :", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    render();
  }
}

function render() {
  const taskList = document.getElementById("activeTasksList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `list ${task.archived ? "archived" : ""}`;

    const editButtonHtml = task.archived
      ? ""
      : `<button onclick="editTask(${index})">Edit</button>`;

    li.innerHTML = `
            <span>${task.text} </span>
            <div class="btns">
                ${editButtonHtml}
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleArchive(${index})">${
      task.archived ? "unarchive" : "Archive"
    }</button>
            </div>
        `;
    taskList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", render);