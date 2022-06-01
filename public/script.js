//--- Pomodoro Timer ---//
//https://www.youtube.com/watch?v=a7Kt7S_4HOA

let startTime = 1;
let breakTime = 2;

let minutes = startTime;
let seconds = 0;

let minutes_interval;
let seconds_interval;

let timerPlay = false;
let breakToggle = false;

let setIterations = 1;
let numIterations = 0;

function template() {
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = "0" + seconds.toString();

  document.getElementById("iteration").innerHTML = numIterations;
  
};

//Control - Start timer

function start() {
  
  if( timerPlay == false) {

    timerPlay = true;
    
    document.getElementById("minutes").innerHTML = minutes;
    if (seconds < 10) {
        document.getElementById("seconds").innerHTML = "0" + seconds.toString(); 
      } else {
        document.getElementById("seconds").innerHTML = seconds;
      }
    
    //minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);
  };
};
  
/*function minutesTimer() {
  minutes = minutes - 1;
  document.getElementById("minutes").innerHTML = minutes; 
}; */

function secondsTimer() {

  if( numIterations >= setIterations) {
    complete()
    } else
    {
    if(seconds <= 0) {
      if(minutes <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
        
        if (numIterations <= setIterations) {
          if( breakToggle == false) {
            breakReset();
            numIterations += 1;
            document.getElementById("iteration").innerHTML = numIterations;
          } else {
            reset();
          }
        } else {
          complete();
        }

        start()
        
      } else {
        seconds = 59;
        document.getElementById("seconds").innerHTML = seconds;
    
        minutes = minutes - 1;
        document.getElementById("minutes").innerHTML = minutes; 
      }
    } else {
      seconds = seconds - 1;
      if (seconds < 10) {
        document.getElementById("seconds").innerHTML = "0" + seconds.toString(); 
      } else {
        document.getElementById("seconds").innerHTML = seconds;
      }
    }
  } 
};

//Control - Pause

function pause() {

  timerPlay = false;
  
  clearInterval(minutes_interval);
  clearInterval(seconds_interval);
};

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
  
};

function breakReset() {

  timerPlay = false;

  clearInterval(minutes_interval);
  clearInterval(seconds_interval);

  minutes = breakTime;
  seconds = 0;

  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = "0" + seconds.toString();

  breakToggle = true;
};

//Complete

function complete() {

  timerPlay = false;
  
  clearInterval(minutes_interval);
  clearInterval(seconds_interval);

  minutes = startTime;
  seconds = 0;

  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = "0" + seconds.toString();

  document.getElementById("done").innerHTML = "Session Complete";
  document.getElementById("done").classList.add("show_message");

};

//--- STOP WATCH ---//

//--- Tasking ---//


const form = document.getElementById("taskForm");
const button = document.querySelector("#taskForm > button");

var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

var tasklist = document.querySelector("#tasklist > ul");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let task = taskInput.value;
  let dueDate = dueDateInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
  let estimatedTime = estimatedTimeInput.value;

  addTask(task, dueDate, estimatedTime, priorityRating);
});

function addTask(name, due, time, priority) {
  console.log("adding task");
  let d = new Date();
  let dateCreated = d.getFullYear();
  let task = {
    name: name,
    due: due,
    time: time,
    priority: priority,
    dateCreated: dateCreated,
  };
  taskListArray.push(task);
  console.log(task);
  renderTask(task);
};

let taskListArray = [];

function renderTask(task) {

  //Create HTML elements
  let item = document.createElement("li");
  item.innerHTML = "<p>" + task.name + "</p>";

  let noTaskIndicator = document.getElementById("emptyList");

  tasklist.appendChild(item);

  // Extra Task DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  // Event Listeners for DOM elements
  delButton.addEventListener("click", function(event) {
    event.preventDefault();
    item.remove();
  })

  //clear the input form
  form.reset();
}