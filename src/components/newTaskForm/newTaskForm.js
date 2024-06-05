import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';


const NewTaskForm = ({ addEditTask }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputMin, setInputMin] = useState('');
  const [inputSec, setInputSec] = useState('');

  const cleanForm = () => {
    setInputTitle('');
    setInputMin('');
    setInputSec('');
  };

  const addNewTask = (e) => {
    if (e.key === 'Enter') {
      const checkMin = inputMin > 1000 ? 999 : inputMin;
      const checkSec = inputSec > 59 ? 0 : inputSec;
      addEditTask(inputTitle, null, +checkMin, +checkSec);
      cleanForm();
    }
  };

  return (
    <form className="task-form">
      <label htmlFor="title">Title</label>
      <input
        className="task-form__title"
        placeholder="What needs to be done?"
        type="input"
        required
        id="title"
        value={inputTitle}
        onChange={(e) => {
          setInputTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          addNewTask(e);
        }}
      />
      <label htmlFor="min">minutes</label>
      <input
        className="task-form__min"
        placeholder="Min"
        max={60}
        type="number"
        id="min"
        value={inputMin}
        onChange={(e) => {
          setInputMin(e.target.value);
        }}
        onKeyDown={(e) => {
          addNewTask(e);
        }}
      />
      <label htmlFor="sec">seconds</label>
      <input
        className="task-form__sec"
        placeholder="Sec"
        type="number"
        max={60}
        id="sec"
        value={inputSec}
        onChange={(e) => {
          setInputSec(e.target.value);
        }}
        onKeyDown={(e) => addNewTask(e)}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  addEditTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
