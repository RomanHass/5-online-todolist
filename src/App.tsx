import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
};

type TasksStateType = {
  [todolistId: string]: Array<TaskType>
}

function App() {
  const todolistId_1 = v1();
  const todolistId_2 = v1();

// BLL
  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { 
      id: todolistId_1, 
      title: 'What to learn', 
      filter: 'all',
     },
     { 
      id: todolistId_2, 
      title: 'What to buy', 
      filter: 'all',
     },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: "HTML", isDone: true },    
      { id: v1(), title: "CSS", isDone: true },    
      { id: v1(), title: "JS/TS", isDone: false },  
    ],
    [todolistId_2]: [
      { id: v1(), title: "Milk", isDone: true },    
      { id: v1(), title: "Bread", isDone: true },    
      { id: v1(), title: "Meat", isDone: false },  
    ]
  });

  // tasks
  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = { id: v1(), title: title, isDone: false };
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
  };

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
  };
  
  const changeTaskStatus = (todolistId: string, taskId: string, newStatus: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus}: t)});
  };

  // todolists
  const changeTodolistFilter = (todolistId: string, newFilterValue: FilterValuesType) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl));
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId];
  };

  const todolistsComponents: Array<JSX.Element> = todolists.map((tl: TodolistType) => {

    let filteredTasks: Array<TaskType> = tasks[tl.id];

    if (tl.filter === 'active') {
      filteredTasks = tasks[tl.id].filter(t => !t.isDone);
    }
  
    if (tl.filter === 'completed') {
      filteredTasks = tasks[tl.id].filter(t => t.isDone);
    }

    // UI
    return (
      <Todolist todolistId={tl.id}
                key={tl.id}
                title={tl.title} 
                tasks={filteredTasks}
                filter={tl.filter}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
      />
    );
  });

  // UI
  return (
    <div className="App">
      {todolistsComponents}
    </div>
  );
}

export default App;
