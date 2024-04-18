const fs = require("fs");

function load() {
  return JSON.parse(fs.readFileSync("task.json"));
}

function save(data) {
  fs.writeFileSync("task.json", JSON.stringify(data));
}

function getAllTask() {
  const tasks = load();
  return tasks;
}

function show(id) {
  const tasks = load();
  const task = tasks.find((task) => task.id === id);
  return task;
}

function destroy(id) {
  const tasks = load();
  const index = tasks.findIndex((task) => task.id === id);
  if (index != -1) {
    tasks.splice(index, 1);
    save(tasks);
    return true;
  }
}

function store(newTask){
    const tasks=load();
    const task={
        id: tasks.length !==0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: newTask.title,
        completed:newTask.completed,
    }
    tasks.push(task);
    save(tasks);
    return task;
}

function update(data,id){
    const tasks=load();
    const index=tasks.findIndex(task=>task.id==id);
    if(index!=-1){
        const task={...tasks[index],...data};
        tasks[index]=task;
        save(tasks);
        return task;
    }
}

function updateStatus(id,status){
    const tasks=load();
    const index=tasks.findIndex(task=>task.id==id);
    if(index!=-1){
        tasks[index].completed=status.completed;
        save(tasks);
        return status
    }
}

function isCompleted(id){
    const tasks=load();
    const index=tasks.findIndex(task=>task.id===id);
    if(index!==-1){
        tasks[index].completed=true;
        save(tasks);
        return tasks[index].completed;
    }
}

function isNotCompleted(id){
    const tasks = load();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks[index].completed = false;
        save(tasks);
        return true;
}}

function listCompleted(){
    const tasks=load();
    const task=tasks.filter(task=>task.completed===true);
    return task;
}
module.exports = {
  getAllTask,
  show,
  destroy,
  store,
  update,
  updateStatus,
  isCompleted,
  isNotCompleted,
  listCompleted
};
