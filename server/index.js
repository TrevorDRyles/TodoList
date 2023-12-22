const express = require("express");
const cors = require("cors");
// const pool = require("./pool.js");
const TodoListService = require("./services/TodoListService");
const {postgres} = require("./config");

const setupServer = () => {
    const app = express();
    // create a server and listen on port 3000
    app.use(cors());
    // allows accessing req.body
    app.use(express.json());
    // declare service being used
    const todoListService = new TodoListService(postgres.client);

    // map from localhost/todos to all todo_list items
    app.get("/todos", async (req, res) => {
        try {
            const todos = await todoListService.getAll();
            // return keyword not needed
            res.json(todos);
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    app.get("/todo/:id", async (req, res) => {
        try {
            const id =req.params.id;
            const todo = await todoListService.get(id);
            if (todo == null) {
                res.status(404);
                res.json({error: 'Not Found'});
            } else {
                res.json(todo.dataValues);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    app.post("/todos", async (req, res) => {
        try {
            let result;
            let {description} = req.body;
            // create a transaction in which the callback is a function that creates a new todolist
            await todoListService.inTransaction(async (t) => {
                result = await todoListService.create(description, t);
            });
            res.json(result.dataValues);
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    app.delete("/todo/:id", async (req, res) => {
        try {
            const id = req.params.id;
            let result;
            await todoListService.inTransaction(async (t) => {
                result = await todoListService.delete(id, t);
            });
            // const todo_ = await pool.query("DELETE FROM todos WHERE todo_id=$1 RETURNING *", [id]);
            if(result === 0){
                res.status(404);
                res.json({error: 'Could not delete resource -- not found'});
            }else{
                res.status(204);
                res.json({});
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    app.put("/todo/:id", async (req, res) => {
        try {
            const desc = req.body.description;
            const id = req.params.id;
            let result;
            await todoListService.inTransaction(async (t) => {
                result = await todoListService.update(id, desc, t);
            });
            if (result == null) {
                res.status(404);
                res.json({error: 'Not Found'});
            } else {
                res.json(result[1][0]);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });
    return app;
};
const App = setupServer();
module.exports = App;

