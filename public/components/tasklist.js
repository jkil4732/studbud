var form = document.getElementById("taskForm");

form.addEventListener("submit", function(event) {
  //console.log(event);
  event.preventDefault();
  console.log("Task Name:");
  console.log(taskForm.elements.taskName.value);
  console.log("Due Date:");
  console.log(taskForm.elements.dueDate.value);
  console.log("Priority:");
  console.log(taskForm.elements.priorityRating.value);
  console.log("Estimated Completion Time:");
  console.log(taskForm.elements.ect.value);
  
  //console.log("Input Elements:");
  //console.log(taskForm.elements);
})

let task = {
  name: "",
  dueDate: "",
  priorityRating: "",
  estimatedCompletionTime: "",
  completionStatus: ""
};

let taskList = [];

function addTask(name, due, priority, time, status) {
  task.name = name;
  task.dueDate = due;
  task.priorityRating = priority;
  task.estimatedCompletionTime = time;
  task.completionStatus = status;

  taskList.push(task);
}

addTask("Task 1", "9th April", "high", "9pm", "active");

console.log(taskList[0]);

//

let taskName = document.getElementById("taskName");
taskName.value = "task";

var test = "1" + 1;
console.log(test);

export default taskList;