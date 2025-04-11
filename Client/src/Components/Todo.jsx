import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Todo.css';

function Todo() {
    const [todo, settodo] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [showPop, setShowPop] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState({});
    const [updatedTitle, setUpdatedTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:8086/todo");
            settodo(res.data);
        } catch (error) {
            console.log('Fetch error:', error);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo) return;
        try {
            const res = await axios.post('http://localhost:8086/todo/', { title: newTodo });
            settodo([...todo, res.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Add error:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8086/todo/${id}`);
            settodo(todo.filter(t => t._id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (!updatedTitle) return;
        try {
            const res = await axios.patch(`http://localhost:8086/todo/${taskToUpdate._id}`, { title: updatedTitle });
            settodo(todo.map(item =>
                item._id === taskToUpdate._id ? res.data : item
            ));
            setUpdatedTitle('');
            setTaskToUpdate({});
            setShowPop(false);
        } catch (err) {
            console.log('Error updating task:', err);
        }
    };

    const openUpdatePopup = (task) => {
        setTaskToUpdate(task);
        setUpdatedTitle(task.title);
        setShowPop(true);
    };

    return (
        <>
            <h1 className="container text-center text-light my-4">Todo App</h1>
            <div className="container">
                {/* Add Task Form */}
                <form onSubmit={addTodo} className="d-flex mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new todo"
                        className="form-control me-2"
                        aria-label="Add a new task"
                    />
                    <button className="btn btn-primary" type="submit">Add</button>
                </form>

                {/* Todo List */}
                <ul className="list-group">
                    {todo.map((todos) => (
                        <li key={todos._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{todos.title}</span>
                            <div className="button-group">
                                <input type="checkbox" aria-label="Mark as completed" />
                                <button className="btn btn-danger mx-2" onClick={() => deleteTodo(todos._id)}>Delete</button>
                                <button className="btn btn-warning" onClick={() => openUpdatePopup(todos)}>Update</button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Update Task Popup */}
                {showPop && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Update Task</h3>
                            <form onSubmit={handleUpdateTask} className="d-flex flex-column">
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    className="form-control mb-2"
                                    placeholder="Update task title"
                                    aria-label="Update task title"
                                />
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-success me-2" type="submit">Update</button>
                                    <button className="btn btn-secondary" onClick={() => setShowPop(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Todo;
