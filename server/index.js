const express = require("express");
const cors = require("cors");
const setupTodoRoutes = require("./routes/todos");
const setupSignupRoutes = require("./routes/accounts");

const setupServer = () => {
    const app = express();
    // create a server and listen on port 3000
    app.use(cors());
    // allows accessing req.body
    app.use(express.json());
    // declare service being used
    app.use("/", setupTodoRoutes());
    app.use("/", setupSignupRoutes());
    return app;
};
const Server = setupServer();
module.exports = Server;

