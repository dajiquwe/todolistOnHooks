import React from 'react';
import PropTypes from 'prop-types';
import './tasksFilter.css';

const TasksFilter = ({ setFilter, filter }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={filter === 'all' ? 'selected' : null}
        onClick={() => {
          setFilter('all');
          // console.log(filter)
        }}
      >
        All
      </button>
    </li>
    <li>
      <button
        type="button"
        className={filter === 'active' ? 'selected' : null}
        onClick={() => {
          setFilter('active');
          // console.log(filter);
        }}
      >
        Active
      </button>
    </li>
    <li>
      <button
        type="button"
        className={filter === 'complete' ? 'selected' : null}
        onClick={() => {
          setFilter('complete');
          // console.log(filter);
        }}
      >
        Completed
      </button>
    </li>
  </ul>
);

TasksFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default TasksFilter;
