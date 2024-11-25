let tasks = [];
const input = document.getElementById("input");
const out = document.getElementById("out");
const validate = document.getElementById("validate");
const editIcon = document.getElementById("editIcon");
getLocal();
input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
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
        name: input.value.trim(),
        states: false
    }
    tasks.push(task);
    addLocal();
    input.value = "";
}
function display() {
    let container = "";
    for (let i = 0; i < tasks.length; ++i) {
        container += `
            <div class="col-md-8 offset-md-2 pt-3">
                <div id="innerInput"
                    class="alert alert-warning rounded-pill d-flex justify-content-between align-items-center">
                    <div style="overflow:auto">
                    <input class="form-control-plaintext my-0 ${tasks[i].states == true ? `text-decoration-line-through` : ``}" 
                    readonly
                    style="overflow-wrap: break-word;" id="taskTextI-${i}" onclick="changeStates(${i})" value="${tasks[i].name}">
                    </div>
                    <div class="d-flex">
                    <div id="editIcon" class="p-1" onclick="editTaskIcon(${i})">
                        <i class="fa-sharp-duotone fa-solid fa-pen-nib"></i>
                    </div>
                    <div id="deleteIcon" class="p-1" onclick="deleteTask(${i})">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                    </div>
                </div>
            </div>
            `
    }
    out.innerHTML = container;
    for (let i = 0; i < tasks.length; ++i) {
        addEvent(i);
    };
}
function getInputId(index) {
    let inputId = `taskTextI-${index}`;
    const editValue = document.getElementById(inputId);
    return editValue;
}
function addEvent(index) {
    const inputId = getInputId(index);
    inputId.addEventListener("blur", () => {
        inputId.classList.replace("form-control", "form-control-plaintext");
       inputId.readOnly = true;
        editValue(index);
    });
}
function editTaskIcon(index) {
    const editV = getInputId(index);
    if (editV.classList.contains("form-control-plaintext")) {
        editV.classList.replace("form-control-plaintext", "form-control");
        editV.readOnly = false;
        editV.focus();
    } else {
        editValue(index);
        editV.classList.replace("form-control", "form-control-plaintext");
       editV.readOnly = true;
    }
}
function editValue(index) {
    const editValue = getInputId(index);
    if (editValue.value.trim() != null && editValue.value.trim() != "") {
        tasks[index].name = editValue.value.trim();
        addLocal();
    }
    display();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    addLocal();
    display();
}
function changeStates(index) {
    tasks[index].states = !tasks[index].states;
    addLocal();
    display();
}

function addLocal() {
    localStorage.setItem("data", JSON.stringify(tasks));
}
function getLocal() {
    if (localStorage.getItem("data") != null) {
        tasks = JSON.parse(localStorage.getItem("data"));
        display();
    }
}
