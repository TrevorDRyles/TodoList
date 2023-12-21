import app from  "./index.js"
let server = app.listen(5000, () => {
    console.log("Listening");
})
export default server;