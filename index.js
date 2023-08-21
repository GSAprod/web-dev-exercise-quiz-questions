import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://opentdb.com/api.php"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Get a random question when the user loads up the page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// Notify when the server is running
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

