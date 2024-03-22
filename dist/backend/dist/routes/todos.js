const express = require("express");
const router = express.Router();
const {postgres} = require("../config/index");
const TodoService = require("../services/TodoService");
const jwt = require("jsonwebtoken");

const setupTodoRoutes = () => {
  let jwtId, jwtUsername;
  const authenticateUser = (req, res, next) => {
    const {authorization} = req.headers;
    // see if there are authorization headers present
    if (!authorization) {
      return res.status(401).json({error: "No authorization header sent"});
    }
    // payload is the JWT
    const token = authorization.split(' ')[1];
    // TODO add this to all routes, and confirm that the decoded jwt ID is equal to the ID of the tasklist's user they are trying to edit
    // verify JWT present
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(401).json({error: 'Unable to verify token'});
        jwtId = decoded.id;
        jwtUsername = decoded.username;
        next();
      }
    );
  };
  // map from localhost/todos to all todo_list items
  const todoService = new TodoService(postgres.client);
  // router.use(authenticateUser); // Apply the middleware to all routes below

  // map from localhost/todos to all todo_list items

  // Get all todos
  router.get("/todos", authenticateUser, async (req, res) => {
    try {
      // the routes definition file uses service as opposed to models directly,
      // as that is the role of the service class
      const todos = await todoService.getTodosForUser(jwtId);
      // jwt.sign({
      //         // id, email, isVerified
      //         id: id,
      //         username: username
      //     },
      //     process.env.JWT_SECRET,
      //     {expiresIn: '2d'},
      //     (err, token) => {
      //         if (err) {
      //             return res.status(200).json(err);
      //         }
      //         res.status(200).json({token: token, todos: todos});
      //     }
      // )
      // return keyword not needed
      res.status(200);
      res.json(todos);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Server error'});
    }
  });

  // get a single todo
  router.get("/todo/:id", authenticateUser, async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await todoService.get(id);
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

  // create a todo
  router.post("/todos", authenticateUser, async (req, res) => {
    try {
      let result;
      let {description} = req.body;
      // create a transaction in which the callback is a function that creates a new todo
      await todoService.inTransaction(async (t) => {
        result = await todoService.create(jwtUsername, description, t);
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

  // delete a todo
  router.delete("/todo/:id", authenticateUser, async (req, res) => {
    const id = req.params.id;
    let result;
    try {
      await todoService.inTransaction(async (t) => {
        result = await todoService.delete(id, t);
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

  // update a todo
  router.put("/todo/:id", authenticateUser, async (req, res) => {
    try {
      const desc = req.body.description;
      const id = req.params.id;
      let result;
      await todoService.inTransaction(async (t) => {
        result = await todoService.update(id, desc, t);
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
