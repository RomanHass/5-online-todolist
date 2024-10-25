import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Button"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (todolistId: string, taskId: string) => void
  addTask: (todolistId: string, newTitle: string) => void
  changeTodolistFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
  changeTaskStatus: (todolistId: string, taskId: string, newStatus: boolean) => void
  removeTodolist: (todolistId: string) => void
};

export const Todolist = ({todolistId, title, tasks, filter, removeTask, changeTodolistFilter: changeFilter, addTask, changeTaskStatus, removeTodolist}: PropsType) => {

  const [taskTitleInput, setTaskTitleInput] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const tasksList = tasks.map(task => {

    const removeTaskHandler = () => removeTask(todolistId, task.id);
    const onChangeTaskTaskStatusHander = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
    const taskClasses: string = task.isDone ? 'task-done' : 'task';

    return (
      <li>
        <input type="checkbox" 
               checked={task.isDone} 
               onChange={onChangeTaskTaskStatusHander} /> 
        <span className={taskClasses}>{task.title}</span>
        <Button title="x"
                onClickHandler={removeTaskHandler} />
      </li>
    );
  })

  const onClickAddTaskHandler = () => {
    const trimmedTitle = taskTitleInput.trim()
    if (trimmedTitle && !isInputBtnDisabled && !userErrorLengthMessage) {
      addTask(todolistId, trimmedTitle);
    } else {
      setInputError(true);
    }
    setTaskTitleInput('');
  };

  const onKeyEnterDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isInputBtnDisabled && !userErrorLengthMessage) {
      onClickAddTaskHandler();
    }
  };

  const onChangeTaskTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(false);
    setTaskTitleInput(e.currentTarget.value);
  };

  const setFilterHandlerCreator = (value: FilterValuesType) => changeFilter(todolistId, value)

  const isInputBtnDisabled = !taskTitleInput
  const userLengthMessage = `There are ${10 - taskTitleInput.length} characters to enter `
  const userErrorLengthMessage = taskTitleInput.length > 10

  const onClickRemoveTodolistHandler = () => {
    removeTodolist(todolistId);
  }

  return (
    <div className="todolist">
      <h3>
        {title}
        <Button title="x"
                onClickHandler={onClickRemoveTodolistHandler}        
        />
      </h3>
      <div>
        <input className={inputError ? 'input-error' : ''}
               value={taskTitleInput}
               onChange={onChangeTaskTitleInput}
               onKeyUp={onKeyEnterDownAddTaskHandler}       
        />
        <Button title="+" 
                disabled={isInputBtnDisabled || userErrorLengthMessage}
                onClickHandler={onClickAddTaskHandler} 
        />
        {isInputBtnDisabled && !inputError &&<div>Max length task title is 10 characters</div>}  
        {!isInputBtnDisabled && !userErrorLengthMessage && !inputError && <div>{userLengthMessage}</div>}
        {userErrorLengthMessage && <div style={{color: 'red'}}>Task title is too long</div>}
        {inputError && <div style={{color: 'orange'}}>Title is required</div>}      
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <Button classes={filter === 'all' ? 'filter-btn-active' : ''}
                title="All" 
                onClickHandler={() => setFilterHandlerCreator('all')}
        />
        <Button classes={filter === 'active' ? 'filter-btn-active' : ''}
                title="Active" 
                onClickHandler={() => setFilterHandlerCreator('active')}
        />
        <Button classes={filter === 'completed' ? 'filter-btn-active' : ''}
                title="Completed" 
                onClickHandler={() => setFilterHandlerCreator('completed')}
        />
      </div>
    </div>
  );
};