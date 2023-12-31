const express = require("express");
const router = express.Router();
const {postgres} = require("../config/index");
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SetupAccountRoutes = () => {
    // map from localhost/todos to all todo_list items
    const userService = new UserService(postgres.client);

    // signup user
    router.post("/signup", async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await userService.getByUsername(username);
            // user exists already
            if (user) {
                res.sendStatus(409);
            }
            // encrypt password
            const passwordHash = await bcrypt.hash(password, 10);
            let resultOfCreate;
            // create user in transaction
            await userService.inTransaction(async (t) => {
                resultOfCreate = await userService.create(username, passwordHash, t);
            });
            // transaction not created
            if (resultOfCreate === undefined) {
                res.status(500);
                res.json({error: "Server error -- couldn't create transaction"});
            } else {
                // transaction created
                // The jwt.sign function takes the payload, secret key, and options as parameters and returns a signed JWT.
                // The generated token can be sent to the client, and the client can include it in subsequent requests for authentication purposes.
                jwt.sign(
                    {
                        id: resultOfCreate.userid,
                        username: resultOfCreate.username
                    },
                    // secret used for encoding and decoding JWTs, stored on the server
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '2d'
                    },
                    (err, token) => {
                        // jwt could not be created
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // jwt created
                        res.status(200);
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

    // sign in user
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