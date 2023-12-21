import express from "express";
import cors from "cors";
import pool from "./pool.js"

let setupServer = () => {
    const app = express();
// create a server and listen on port 3000
    app.use(cors());
// allows accessing req.body
    app.use(express.json());

// map from localhost/todos to all todo_list items
    app.get("/todos", async (req, res) => {
        try {
            const todos = await pool.query("SELECT * FROM todo");
            // return not needed
            res.json(todos.rows);
        } catch (err) {
            console.log(err);
        }
    });

    app.get("/todo/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const todos = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
            res.json(todos.rows[0]);
        } catch (err) {
            console.log(err);
        }
    });

    app.post("/todos", async (req, res) => {
        try {
            let {description} = req.body;
            const todo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
            res.json(todo.rows[0]);
        } catch (err) {
            console.log(err);
        }
    });

    app.delete("/todo/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const todo = await pool.query("DELETE FROM todo WHERE todo_id=$1 RETURNING *", [id]);
            res.json(todo.rows[0]);
        } catch (err) {
            console.log(err);
        }
    });

    app.put("/todo/:id", async (req, res) => {
        try {
            const desc = req.body.description;
            const id = req.params.id;
            const todo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *", [desc, id]);
            res.json(todo.rows[0]);
        } catch (err) {
            console.log(err);
        }
    });
    return app;
};
const App = setupServer();
export default App;

