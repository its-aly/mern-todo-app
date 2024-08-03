const Todo = require("../models/todo.model");

//GET ALL TODOS
const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(400).json("Error:" + error);
  }
};
//Adding todos
const addTodo = async (req, res) => {
  const text = req.body.text;
  const newTodo = new Todo({ text });
  try {
    await newTodo.save();
    res.json(text + " added");
  } catch (error) {
    res.status(400).json("Error:" + error);
  }
};
//GET TODO BY ID
const getTodoByID = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(400).json("ERROR:" + error);
  }
};

//DELETE TODO BY ID
const deleteTodoById = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Todo.findById(id);
    await Todo.findByIdAndDelete(id);
    res.json("successfully delete item " + item.text);
  } catch (error) {
    res.status(400).json("ERROR:" + error);
  }
};

//UPDATE BY ID
const updateTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json("Todo not found");

    todo.text = req.body.text;
    todo.completed = req.body.completed;

    await todo.save();
    res.json("Todo updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getTodo,
  addTodo,
  getTodoByID,
  deleteTodoById,
  updateTodoById,
};
