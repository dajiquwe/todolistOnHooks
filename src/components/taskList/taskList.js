import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './taskList.css';

const TaskList = ({ tasks, filter, changeRemoveTask, addEditTask, inputLable, setInputLable, changeTime }) => {
  const itemList = tasks.map((task) => {
    const { id, isDone, isEdit, isVisible } = task;
    let completedStyle;
    let classShow = '';

    if (isEdit) {
      completedStyle = 'editing';
    } else if (isDone) {
      completedStyle = 'completed';
    } else completedStyle = null;

    // if (filter === 'all' || filter === isDone) {
      if (isVisible) {
        classShow = 'isDisplay'
        // console.log(classShow);
      }
      if (!isVisible) {
        classShow = 'notDisplay'
      }
      // if (isVisible) {
      return (
        <li className={`${completedStyle} ${classShow}`} key={id}>
          <Task
            {...task}
            changeRemoveTask={changeRemoveTask}
            addEditTask={addEditTask}
            inputLable={inputLable}
            // startTimer={startTimer}
            setInputLable={setInputLable}
            changeTime={changeTime}
            filter={filter}
          />
        </li>
      );
      // }
      // return null
    // }
    // return null;
  });

  return <ul className="todo-list">{itemList}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  changeRemoveTask: PropTypes.func.isRequired,
  addEditTask: PropTypes.func.isRequired,
  inputLable: PropTypes.string.isRequired,
  setInputLable: PropTypes.func.isRequired,
  changeTime: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  filter: 'all',
};

export default TaskList;
