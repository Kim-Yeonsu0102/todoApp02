let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let taskListContent = document.getElementById("task-list");
let underLine = document.getElementById("tab-underline");
let tabs = document.querySelectorAll(".task-tabs div");
let selectedMenu = "tab-all";
let taskList = [];
let filteredList = [];

addButton.addEventListener("mousedown", addTask);
userInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask() {
    let taskValue = userInput.value;
    let task = {
        content: taskValue,
        isComplete: false,
        id: randomIdGenerate(),
    };


    taskList.push(task);
    userInput.value = "";
    render();
}

function render() {
    let result = "";
    list = [];
    if (selectedMenu === "tab-all") {
        list = taskList;
    } else if (selectedMenu === "tad-not-Done" || selectedMenu === "Done") {
        list = filteredList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            console.log("click")
            result += `<div class="task" id="${list[i].id}">
              <span class="taskLine">${list[i].content}</span>
              <div class="button-box">
              <button class="box-btn bg01" onclick="toggle_done('${list[i].id}')"><i class="material-icons">rotate_left</i></button>
              <button class="box-btn bg03" onclick="deleteTask('${list[i].id}')"><i class="material-icons">not_interested</i></button>
              </div>
          </div>`;
        } else {
            result += `<div class="task" id="${list[i].id}" >
              <span>${list[i].content}</span>
              <div class="button-box">
              <button class="box-btn bg02" onclick="toggle_done('${list[i].id}')"><i class="material-icons" >check</i></button>
              <button class="box-btn bg03" onclick="deleteTask('${list[i].id}')"><i class="material-icons">not_interested</i></button>
              </div>
          </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = result;
}


function toggle_done(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
        }
    }

    filter();
}

function filter(e) {
    if (e) {
        selectedMenu = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
            e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
    }

    filteredList = [];
    if (selectedMenu === "tad-not-Done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filteredList.push(taskList[i]);
            }
        }
    } else if (selectedMenu === "Done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filteredList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIdGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
}