import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;

    try {
      const res = await axios.post('http://localhost:8000/api/tasks', { todo: task });
      addTask(res.data);
      setTask('');
    } catch (err) {
      console.log('Error adding task:', err);
    }
  };

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
