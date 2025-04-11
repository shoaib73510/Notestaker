import Todo from '../models/Todo_model.js';

export const createTodo = async (req, res) => {
    const todoData = req.body;
    console.log(todoData);

    if (!todoData) {
        return res.status(400).json({ "Message": "Invalid todo object" });
    }

    try {
        const newTodo = new Todo(todoData); // Use the Todo constructor
        await newTodo.save();
        res.status(201).json({ "message": "Todo created successfully" });
    } catch (error) {
        res.status(500).json({ "Message": error.message });
    }
};

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find(); // Use the Todo model
        res.send(todos);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Use the Todo model
        if (!todo) return res.status(404).send('Todo not found');
        res.send(todo);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use the Todo model
        if (!todo) return res.status(404).send('Todo not found');
        res.status(200).send({ message: 'Todo updated successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).send('Todo not found');
        res.send(todo);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
};
