const app = require("./index");
let server = app.listen(5000, () => {
    console.log("Listening");
})
module.exports = server;