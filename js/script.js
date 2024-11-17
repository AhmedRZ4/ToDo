let tasks = [];
const input = document.getElementById("input");
const out = document.getElementById("out");
const validate = document.getElementById("validate");
input.addEventListener("keypress", function(event){
    if(event.key=="Enter"){
        run();
    }
});
function run() {
    if (checkEmpty()) {
        addTask();
        display();
    } else {
        validate.classList.add("invalid");
    }
}
function checkEmpty() {
    if (!(input.value.trim().length === 0)) {
        return true;
    }
    else {
        return false;
    }
}
function keyUpCheck() {
    if (checkEmpty()) {
        validate.classList.remove("invalid");

    }
}
function addTask() {

    let task = {
        name: input.value,
        states: false
    }
    tasks.push(task)
    input.value = "";

}
function display() {
    let container = "";
    for (let i = 0; i < tasks.length; ++i) {
        container += `
            <div class="col-md-8 offset-md-2 pt-3">
                <div
                    class="alert alert-warning rounded-pill d-flex justify-content-between align-items-center">
                    <div style="overflow:auto">
                    <p style="overflow-wrap: break-word;" class="my-0 ${tasks[i].states == true ? `text-decoration-line-through` : ``}" id="taskTextP" onclick="changeStates(${i})">${tasks[i].name}</p>
                    </div>
                    <div id="deleteIcon" class="p-1" onclick="deleteTask(${i})">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
            `
    }
    out.innerHTML = container;
}
function deleteTask(index) {
    tasks.splice(index, 1);
    display();
}
function changeStates(index) {
    tasks[index].states = !tasks[index].states;
    display();
}


