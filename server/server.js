// connect Sequelize to Postgres
require("./bin/start");
// define routs for the application
const app = require("./index");

let server = app.listen(5000, () => {
    console.log("Listening");
})
module.exports = server;