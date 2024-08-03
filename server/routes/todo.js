const {
  getTodo,
  addTodo,
  getTodoByID,
  deleteTodoById,
  updateTodoById,
} = require("../controllers/todoController");

const router = require("express").Router();

router.get("/", getTodo);
router.post("/add", addTodo);
router.get("/:id", getTodoByID);
router.delete("/:id", deleteTodoById);
router.put("/update/:id", updateTodoById);

module.exports = router;
