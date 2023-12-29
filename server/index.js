const express = require("express");
const cors = require("cors");
const setupTodoRoutes = require("./routes/todos");

const setupServer = () => {
    const app = express();
    // create a server and listen on port 3000
    app.use(cors());
    // allows accessing req.body
    app.use(express.json());
    // declare service being used
    app.use("/", setupTodoRoutes());
    return app;
};
const Server = setupServer();
module.exports = Server;

