const express = require("express");
const cors = require("cors");
// const pool = require("./pool.js");
const TodoListService = require("./services/TodoListService");
const {postgres} = require("./config");
const setupTodoRoutes = require("./routes/todos");

const setupServer = () => {
    const app = express();
    // create a server and listen on port 3000
    app.use(cors());
    // allows accessing req.body
    app.use(express.json());
    // declare service being used
    const todoListService = new TodoListService(postgres.client);
    app.use("/", setupTodoRoutes(todoListService));
    return app;
};
const Server = setupServer();
module.exports = Server;

