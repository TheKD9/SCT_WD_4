let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter="all";

const save=()=>localStorage.setItem("tasks",JSON.stringify(tasks));

function addTask(){
    if(!taskInput.value) return;

    tasks.push({
        id:Date.now(),
        text:taskInput.value,
        date:date.value,
        completed:false
    });

    taskInput.value="";
    displayTasks();
}

function setFilter(f){
    filter=f;
    displayTasks();
}

function toggleComplete(id){
    const t=tasks.find(x=>x.id==id);
    t.completed=!t.completed;
    displayTasks();
}

function deleteTask(id){
    tasks=tasks.filter(t=>t.id!=id);
    displayTasks();
}

function displayTasks(){
    const list=document.getElementById("taskList");
    list.innerHTML="";

    let filtered=tasks;

    if(filter=="completed")
        filtered=tasks.filter(t=>t.completed);

    if(filter=="today"){
        const today=new Date().toDateString();
        filtered=tasks.filter(t=>t.date && new Date(t.date).toDateString()==today);
    }

    filtered.forEach(task=>{
        const li=document.createElement("li");
        li.className=task.completed?"completed":"";

        li.innerHTML=`
            <div>
                <b>${task.text}</b><br>
                <small>${task.date?new Date(task.date).toLocaleString():""}</small>
            </div>
            <div class="taskBtns">
                <button class="completeBtn" onclick="toggleComplete(${task.id})">✔</button>
                <button class="deleteBtn" onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;
        list.appendChild(li);
    });

    updateStats();
    save();
}

function updateStats(){
    const total=tasks.length;
    const completed=tasks.filter(t=>t.completed).length;

    totalTasks.innerText=total;
    completedTasks.innerText=completed;
    progressPercent.innerText= total? Math.round(completed/total*100)+"%":"0%";
}

displayTasks();