import React, { useState, useCallback } from 'react';
import { uniqueId } from 'lodash';
import TaskList from '../taskList/taskList';
import NewTaskForm from '../newTaskForm/newTaskForm';
import Footer from '../footer/footer';
import './app.css';

const App = () => {
  const createTodoItem = (id, lable, min = 0, sec = 0, isDone = false, date = new Date(), isVisible = true) => {
    const task = {
      id,
      lable,
      date,
      isDone,
      isEdit: false,
      min,
      sec,
      isVisible
    };

    return task;
  };

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [inputLable, setInputLable] = useState('');
 
  const clearComplited = () => {
    let resultArr = [];
    resultArr = tasks.filter((task) => task.isDone === false)
    setTasks(resultArr);
  };

  const changeRemoveTask = (id, act, prop) => {
    const index = tasks.findIndex((task) => task.id === id);
    let resultArr;

    if (act === 'change') {
      const currentTask = {
        ...tasks[index],
        [prop]: !tasks[index][prop],
      };
      
      resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];
    } else if (act === 'remove') {
      resultArr = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    }

    setTasks(resultArr);
  };

  const addEditTask = (newLable, id, min, sec) => {
    if (newLable && !id) {
      const resultArr = [...tasks, createTodoItem(uniqueId('n'), newLable, min, sec)];

      setTasks(resultArr);
    } else if (newLable && id) {
      const index = tasks.findIndex((task) => task.id === id);

      const currentTask = {
        ...tasks[index],
        lable: newLable,
        isEdit: false,
      };
      const resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];

      setTasks(resultArr);
    }
  };

  const changeTime = useCallback((id, min, sec) => {
    setTasks((oldTasks) => {
      const index = oldTasks.findIndex((task) => task.id === id);

      if (oldTasks[index]) {
        const currentTask = {
          ...oldTasks[index],
          min,
          sec,
        };
        // console.log('change time')

        const resultArr = [...oldTasks.slice(0, index), currentTask, ...oldTasks.slice(index + 1)];

        return resultArr;
      }
      return oldTasks;
    });
  }, []);

  if (filter === 'all') {
    // console.log('all')
    tasks.map((task) => {
      task.isVisible = true;
      return task
    })
  }
  if (filter === 'active') {
    // console.log('active')
    tasks.map((task) => {
      if (task.isVisible === false) {
        task.isVisible = true
      }
      if (task.isDone === true) {
        task.isVisible = false
      }
      return task
    })
  }
  if (filter === 'complete') {
    // console.log('complete')
    tasks.map((task) => {
      if (task.isVisible === false) {
        task.isVisible = true
      }
      if (task.isDone === false) {
        task.isVisible = false
      }
      return task
    })
  }

  return (
    <section className="todoapp">
       <h1>Todos</h1>
       {/* <button>Start</button>
       <button>Stop</button> */}
      <NewTaskForm addEditTask={addEditTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          filter={filter}
          setInputLable={setInputLable}
          changeRemoveTask={changeRemoveTask}
          addEditTask={addEditTask}
          inputLable={inputLable}
          changeTime={changeTime}
          // startTimer={startTimer}
        />
      </section>
      <Footer
        setFilter={setFilter}
        filter={filter}
        clearComplited={clearComplited}
        activeTasksLength={tasks.filter((task) => !task.isDone).length}
      />
    </section>
  );
};

export default App

// const FILTER_MAP = {
//   All: () => true,
//   Active: (task) => !task.completed,
//   Completed: (task) => task.completed,
// };

// const FILTER_NAMES = Object.keys(FILTER_MAP);