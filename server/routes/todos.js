const express = require("express");
const router = express.Router();
const {postgres} = require("../config/index");
const TodoListService = require("../services/TodoListService");

const setupTodoRoutes = () => {
    // map from localhost/todos to all todo_list items
    const todoListService = new TodoListService(postgres.client);
    // map from localhost/todos to all todo_list items
    router.get("/todos", async (req, res) => {
        try {
            // the routes definition file uses service as opposed to models directly,
            // as that is the role of the service class
            const todos = await todoListService.getAll();
            // return keyword not needed
            res.status(200);
            res.json(todos);
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    router.get("/todo/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const todo = await todoListService.get(id);
            if (todo == null) {
                res.status(404);
                res.json({error: 'Not Found'});
            } else {
                res.status(200);
                res.json(todo.dataValues);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    router.post("/todos", async (req, res) => {
        try {
            let result;
            let {description} = req.body;
            // create a transaction in which the callback is a function that creates a new todolist
            await todoListService.inTransaction(async (t) => {
                result = await todoListService.create(description, t);
            });
            if (result === undefined) {
                res.status(500);
                res.json({error: "Server error -- couldn't create transaction"});
            } else {
                res.status(201);
                res.json(result.dataValues);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    router.delete("/todo/:id", async (req, res) => {
        const id = req.params.id;
        let result;
        try {
            await todoListService.inTransaction(async (t) => {
                result = await todoListService.delete(id, t);
            });
            // const todo_ = await pool.query("DELETE FROM todos WHERE todo_id=$1 RETURNING *", [id]);
            if (result === 0) {
                res.status(404);
                res.json({error: 'Could not delete resource -- not found'});
            } else if (result > 0) {
                res.status(204);
                res.json({});
            } else {
                // undefined
                // rollback
                res.status(500);
                res.json({error: 'Error in transaction'});
            }
        } catch (error) {
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    router.put("/todo/:id", async (req, res) => {
        try {
            const desc = req.body.description;
            const id = req.params.id;
            let result;
            await todoListService.inTransaction(async (t) => {
                result = await todoListService.update(id, desc, t);
            });
            if (result == null) {
                res.status(500);
                res.json({error: 'Server error -- transaction not completed'});
            } else if (result[0] === 0) {
                res.status(404);
                res.json({error: 'Not Found'});
            } else {
                // result[0] > 0
                res.json(result[1][0]);
                res.status(200);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });
    return router;
};

module.exports = setupTodoRoutes;