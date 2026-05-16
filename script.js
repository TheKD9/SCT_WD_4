let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const save = () => localStorage.setItem("tasks", JSON.stringify(tasks));

function addTask(){
    const text=taskInput.value;
    if(!text) return;

    tasks.push({
        text,
        date: date.value,
        category: category.value,
        priority: priority.value,
        completed:false
    });
    
    taskInput.value="";
    displayTasks();
}

function setFilter(f){
    filter=f;
    displayTasks();
}

function toggleComplete(i){
    tasks[i].completed=!tasks[i].completed;
    displayTasks();
}

function deleteTask(i){
    tasks.splice(i,1);
    displayTasks();
}

function editTask(i){
    const newText = prompt("Edit task", tasks[i].text);
    if(newText) tasks[i].text=newText;
    displayTasks();
}

function displayTasks(){
    const list=document.getElementById("taskList");
    list.innerHTML="";

    let filtered=tasks.filter(t=>{
        if(filter=="active") return !t.completed;
        if(filter=="completed") return t.completed;
        return true;
    });

    filtered.forEach((task,i)=>{
        const li=document.createElement("li");
        li.className=`${task.priority} ${task.completed? 'completed' :''}`;
        
        li.innerHTML=`
            <div>
                <b>${task.text}</b><br>
                <small>${task.category} | ${task.date? new Date(task.date).toLocaleString():""}</small>
            </div>
            <div>
                <button onclick="toggleComplete(${i})">✔</button>
                <button onclick="editTask(${i})">✏</button>
                <button onclick="deleteTask(${i})">🗑</button>
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
    taskCount.innerText=`${completed}/${total} completed`;
    progressBar.style.width=total? (completed/total*100)+"%": "0%";
}
displayTasks();
