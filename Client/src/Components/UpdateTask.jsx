import React, { useState } from 'react';
import axios from 'axios';

const UpdateTask = ({ task, updateTask, removePopup }) => {
  const [updatedTitle, setUpdatedTitle] = useState(task.todo);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:8000/api/tasks/${task._id}`, { todo: updatedTitle });
      updateTask(res.data);
      removePopup();
    } catch (err) {
      console.log('Error updating task:', err);
    }
  };

 
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Update Task</h3>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button className='btn btn-warning' type="submit">Update</button>
        </form>
        <button onClick={removePopup}>Close</button>
      </div>
    </div>
  );
};




export default UpdateTask;