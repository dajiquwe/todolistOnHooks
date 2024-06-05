/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css'

const getRightTimeFormat = (num) => {
  const result = num <= 9 ? `0${num}` : String(num);
  return result;
};

const Task = ({
  id,
  lable,
  date,
  isDone,
  isEdit,
  changeRemoveTask,
  addEditTask,
  inputLable,
  setInputLable,
  changeTime,
  min,
  sec,
}) => {
  const [thatMin, setThatMin] = useState(min);
  const [thatSec, setThatSec] = useState(sec);
  const [isRun, setRun] = useState(false);

  const getTime = () => <span className="time">{`${getRightTimeFormat(thatMin)}:${getRightTimeFormat(thatSec)}`}</span>;

  const editInput = isEdit ? (
    <input
      type="text"
      className="edit"
      value={inputLable}
      onChange={(evt) => setInputLable(evt.target.value)}
      onKeyDown={(evt) => (evt.key === 'Enter' ? addEditTask(inputLable, id) : null)}
    />
  ) : null;

  // const startTimer = () => {
  //   if (thatSec === 0 && thatMin > 0) {
  //     setThatMin(thatMin - 1);
  //     setThatSec(59);
  //   } else if (thatSec > 0) {
  //     setThatSec(thatSec - 1);
  //   } else setRun(false);
  // };

  const timeZero = () => {
    setThatMin(0);
    setThatSec(0);
  }

  useEffect(() => {
    let baseTimer;
    if (isRun) {
      baseTimer = setInterval(() => {
        if (thatSec === 0 && thatMin > 0) {
          setThatMin(thatMin - 1);
          setThatSec(59);
        } else if (thatSec > 0) {
          setThatSec(thatSec - 1);
        } else setRun(false);
      }, 1000);
    }
    return () => {
      clearInterval(baseTimer);
    };
  });

  useEffect(() => () => changeTime(id, thatMin, thatSec), [isRun, changeTime, id, thatMin, thatSec]);

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          onClick={() => {changeRemoveTask(id, 'change', 'isDone'); timeZero()}}
          type="checkbox"
          defaultChecked={isDone}
        />
        <label>
          <span className="title">{lable}</span>
          <span className="description description__timer-btn">
            <button aria-label="start timer" type="button" className="icon icon-play" onClick={() => setRun(true)} />
            <button aria-label="pause timer" type="button" className="icon icon-pause" onClick={() => setRun(false)} />
            {getTime()}
          </span>
          <span className="description description_max-width">{`created ${formatDistanceToNow(new Date(date), {
            addSuffix: true,
            includeSeconds: true,
          })}`}</span>
        </label>
        <button
          aria-label="change task lable"
          className="icon icon-edit"
          onClick={() => {
            changeRemoveTask(id, 'change', 'isEdit');
            setInputLable(lable);
          }}
          type="button"
        />
        <button
          aria-label="remove task"
          className="icon icon-destroy"
          onClick={() => {
            changeRemoveTask(id, 'remove');
          }}
          type="button"
        />
      </div>
      {editInput}
    </>
  );
};


Task.propTypes = {
  id: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  isDone: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  changeRemoveTask: PropTypes.func.isRequired,
  addEditTask: PropTypes.func.isRequired,
  inputLable: PropTypes.string.isRequired,
  setInputLable: PropTypes.func.isRequired,
  min: PropTypes.number,
  sec: PropTypes.number,
  changeTime: PropTypes.func.isRequired,
};

Task.defaultProps = {
  min: 0,
  sec: 0,
};
export default Task;
