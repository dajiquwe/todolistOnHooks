import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasksFilter/tasksFilter';
import './footer.css';


const Footer = ({ setFilter, filter, clearComplited, activeTasksLength }) => (
  <footer className="footer">
    <span className="todo-count">{activeTasksLength} items left</span>
    <TasksFilter setFilter={setFilter} filter={filter} />
    <button className="clear-completed" onClick={clearComplited} type="button">
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  clearComplited: PropTypes.func.isRequired,
  activeTasksLength: PropTypes.number.isRequired,
};

Footer.defaultProps = {
  filter: 'all',
};

export default Footer;
