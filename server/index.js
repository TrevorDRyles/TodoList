const express = require("express");
const cors = require("cors");
const setupTodoRoutes = require("./routes/todos");
const setupSignupRoutes = require("./routes/accounts");
const {graphqlHTTP} = require('express-graphql');
const schema = require("../server/data/schema");
const resolvers = require("../server/data/resolvers");
const jwt = require("jsonwebtoken");

const setupServer = () => {
    const app = express();
    app.use(cors());
    // allows accessing req.body
    app.use(express.json());
    // declare service being used
    app.use("/", setupTodoRoutes());
    app.use("/", setupSignupRoutes());

    const root = resolvers;

    // Middleware to check JWT
    const authMiddleware = (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        token = token.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message: 'Invalid token'});
        }
    };

    app.use('/graphql', authMiddleware, graphqlHTTP((req, res) => ({
        schema: schema,
        rootValue: root,
        graphiql: true,
        context: {
            req,
            res
        },
    })));
    return app;
};
const Server = setupServer();
module.exports = Server;

