const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todosRouter = require("./routes/todo");
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
try {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb connection established successfully");
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${JSON.stringify(req.body)}`);
  next();
});

app.use("/todos", todosRouter);

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
