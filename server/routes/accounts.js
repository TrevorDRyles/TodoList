const express = require("express");
const router = express.Router();
const {postgres} = require("../config/index");
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SetupAccountRoutes = () => {
    // map from localhost/todos to all todo_list items
    const userService = new UserService(postgres.client);

    router.post("/signup", async (req, res) => {
        try {
            let result;
            const {username, password} = req.body;
            const user = await userService.getByUsername(username);
            if (user) {
                // user exists already
                res.status(409);
                res.json({error: "user already exists"})
                return;
            }
            // encrypt password
            const passwordHash = await bcrypt.hash(password, 10);
            // create user
            await userService.inTransaction(async (t) => {
                result = await userService.create(username, passwordHash, t);
            });
            if (result === undefined) {
                res.status(500);
                res.json({error: "Server error -- couldn't create transaction"});
            } else {
                jwt.sign({
                        id: result.userid,
                        username: result.username
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '2d'
                    },
                    (err, token) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(201);
                        res.json({token});
                    }
                );
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    router.post("/signin", async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await userService.getByUsername(username);
            if (!user) {
                // user does not exist
                res.sendStatus(401);
            }
            const usernameFound = user.username;
            const passwordFound = user.password;
            // encrypt password
            const isCorrect = await bcrypt.compare(password, passwordFound);
            if (isCorrect) {
                jwt.sign({
                        id: user.userid,
                        username: usernameFound,
                        password: passwordFound
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '2d'
                    },
                    (err, token) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(201);
                        res.json({token});
                    }
                );
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    return router;
}

module.exports = SetupAccountRoutes;