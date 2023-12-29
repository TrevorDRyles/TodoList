// connect Sequelize to Postgres
require("./bin/start");
// define routs for the application
const server = require("./index");

let app = server.listen(5000, () => {
    console.log("Listening");
})
module.exports = app;