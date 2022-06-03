//--- Pomodoro Timer ---//
//https://www.youtube.com/watch?v=a7Kt7S_4HOA
let startTime = 25;
let breakTime = 5;
let minutes = startTime;
let seconds = 0;
let minutes_interval;
let seconds_interval;
let timerPlay = false;
let breakToggle = false;
let setIterations = 3;
let numIterations = 0;
function template() {
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = "0" + seconds.toString();
    document.getElementById("iteration").innerHTML = numIterations + " of " + setIterations + " rounds";
}
//Control - Start timer
function start() {
    if (timerPlay == false) {
        timerPlay = true;
        document.getElementById("minutes").innerHTML = minutes;
        if (seconds < 10) document.getElementById("seconds").innerHTML = "0" + seconds.toString();
        else document.getElementById("seconds").innerHTML = seconds;
        //minutes_interval = setInterval(minutesTimer, 60000);
        seconds_interval = setInterval(secondsTimer, 1000);
    }
}
/*function minutesTimer() {
  minutes = minutes - 1;
  document.getElementById("minutes").innerHTML = minutes; 
}; */ function secondsTimer() {
    if (numIterations >= setIterations) complete();
    else if (seconds <= 0) {
        if (minutes <= 0) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            if (numIterations <= setIterations) {
                if (breakToggle == false) {
                    breakReset();
                    numIterations += 1;
                    document.getElementById("iteration").innerHTML = numIterations;
                } else reset();
            } else complete();
            start();
        } else {
            seconds = 59;
            document.getElementById("seconds").innerHTML = seconds;
            minutes = minutes - 1;
            document.getElementById("minutes").innerHTML = minutes;
        }
    } else {
        seconds = seconds - 1;
        if (seconds < 10) document.getElementById("seconds").innerHTML = "0" + seconds.toString();
        else document.getElementById("seconds").innerHTML = seconds;
    }
}
//Control - Pause
function pause() {
    timerPlay = false;
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
}
//Control - Reset
function reset() {
    timerPlay = false;
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    minutes = startTime;
    seconds = 0;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = "0" + seconds.toString();
    breakToggle = false;
}
function breakReset() {
    timerPlay = false;
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    minutes = breakTime;
    seconds = 0;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = "0" + seconds.toString();
    breakToggle = true;
}
//Complete
function complete() {
    timerPlay = false;
    breakToggle = false;
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = "0" + seconds.toString();
    document.getElementById("done").innerHTML = "Session Complete";
    document.getElementById("done").classList.add("show_message");
}
//--- STOP WATCH ---//
//--- TASKING ---//
// Modal from https://rmodal.js.org/
window.onload = function() {
    var modal = new RModal(document.getElementById("modal"), {
        //content: 'Abracadabra'
        beforeOpen: function(next) {
            console.log("beforeOpen");
            next();
        },
        afterOpen: function() {
            console.log("opened");
        },
        beforeClose: function(next) {
            console.log("beforeClose");
            next();
        },
        afterClose: function() {
            console.log("closed");
        },
        dialogOpenClass: "animate__slideInDown",
        dialogCloseClass: "animate__slideOutUp"
    });
    window.modal = modal;
};
//
const taskForm = document.getElementById("taskForm");
const button = document.querySelector("#taskForm > button");
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var notesInput = document.getElementById("notesInput");
var tasklist = document.querySelector("#tasklist > ul");
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let taskNotes = notesInput.value;
    let estimatedTime = estimatedTimeInput.value;
    addTask(task, dueDate, estimatedTime, taskNotes);
});
//Create main task
function addTask(name, due, time, notes) {
    let d = new Date();
    let dateCreated = [
        d.getFullYear(),
        d.getMonth(),
        d.getFullMonth
    ];
    let task = {
        name: name,
        due: due,
        time: time,
        notes: notes,
        dateCreated: dateCreated,
        subtasks: []
    };
    taskListArray.push(task);
    renderTask(task);
}
let taskListArray = [];
let taskCompletedArray = [];
for (task of taskListArray)renderTask(task);
//Create subtask
function addSubtask(name, parentTask) {
    console.log("adding sub task");
    let d = new Date();
    let dateCreated = [
        d.getFullYear(),
        d.getMonth(),
        d.getFullMonth
    ];
    let task = {
        name: name,
        //time: time,
        dateCreated: dateCreated
    };
    parentTask.subtasks.push(task);
    console.log(parentTask);
    renderSubtask(parentTask, task);
}
//Render Tasks
function renderTask(task) {
    //Create HTML elements
    let item = document.createElement("li");
    item.classList.add("task-card");
    item.innerHTML = `<div class="main-task-container" id="main-task-container` + task.name + `">
            <div class="col-1">
              <button class="collapsible" id="collapsible` + task.name + `"></button>
              <button class="complete-button" id="task-complete` + task.name + `"></button>
              <h3>` + task.name + `</h3>
            </div>
            <div class="col-2">
              <button class="edit-task-button" id="editTask` + task.name + `"></button>
            </div>
          </div>
          <!-- <p>Due June 23</p> -->

          <ul class="content" id="content` + task.name + `">
          </ul>
          <div class="subtask-container">
            <div class="row">
              <div class="col-1">
                <div class="plus-image"></div>
                <form id="subtaskForm` + task.name + `">
                  <label for="subtask"></label>
                  <input type="text" id="subtaskInput` + task.name + `" name="subtask" placeholder="add subtask">
                </form>
              </div>
            </div>          
          </div>`;
    //
    for (subtask of task.subtasks)renderSubtask(task, subtask);
    let noTaskIndicator = document.getElementById("emptyList");
    tasklist.appendChild(item);
    // Event Listeners for DOM elements
    var taskCard = document.getElementById("editTask" + task.name).addEventListener("click", function(event) {
        event.preventDefault();
        console.log("modal open");
        modal.open();
    });
    var subtaskForm = document.getElementById("subtaskForm" + task.name);
    var subtaskInput = document.getElementById("subtaskInput" + task.name);
    subtaskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let subtask = subtaskInput.value;
            subtaskInput.blur();
            subtaskForm.reset();
            addSubtask(subtask, task);
        }
    });
    let taskCompleteButton = document.getElementById("task-complete" + task.name);
    taskCompleteButton.addEventListener("click", function(event) {
        event.preventDefault();
        taskCompletedArray.push(task);
        item.remove();
    });
    var coll1 = document.getElementById("collapsible" + task.name);
    coll1.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById("content" + task.name);
        if (content.style.display === "block") content.style.display = "none";
        else content.style.display = "block";
    });
    //clear the input form
    taskForm.reset();
}
//Render new subtask
function renderSubtask(parentTask, task) {
    let item = document.getElementById("content" + parentTask.name);
    item.insertAdjacentHTML("beforeend", `<li class="subtask-container" id="subtask-container` + parentTask.name + task.name + `">
                      <div class="row">
                        <div class="col-1">
                          <button class="complete-button" id="subtask-complete` + parentTask.name + task.name + `"></button>
                          <h3>` + task.name + `</h3>
                        </div>
                        <div class="col-2">
                          <p>2h</p>
                        </div>          
                      </div>
                    </li>`);
    //
    let completeCheckbox = document.getElementById("subtask-complete" + parentTask.name + task.name);
    completeCheckbox.addEventListener("click", function(event) {
        event.preventDefault();
        removeSubtask(parentTask, task);
    });
}
function removeSubtask(parentTask, task) {
    const index = parentTask.subtasks.findIndex((item)=>item.name == task.name);
    if (index >= 0) {
        parentTask.subtasks.splice(index, 1);
        var selectSubtask = document.getElementById("subtask-container" + parentTask.name + task.name);
        selectSubtask.innerHTML = "";
        selectSubtask.remove();
    }
}
// Task Card Component
var coll = document.getElementsByClassName("collapsible");
var i;
for(i = 0; i < coll.length; i++)coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("placeHolder");
    if (content.style.display === "block") content.style.display = "none";
    else content.style.display = "block";
});

//# sourceMappingURL=timer.f3bd186e.js.map
