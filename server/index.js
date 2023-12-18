import express from "express";
import cors from "cors";

const app = express();
// create a server and listen on port 3000
app.use(cors());
app.get("/", (req, res) => {
    res.json({"hoes":"here"});
});

app.listen(5000, () => {
    console.log("Listening");
})