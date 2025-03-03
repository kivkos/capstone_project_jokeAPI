import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

var API = "https://v2.jokeapi.dev/joke/";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs", {content: "Hello! Let's brighten up your day! 😅 "})
});

app.post("/get-joke", async (req, res) => {
    const category = req.body.category;
    try {
        let result = await axios.get(API + category + "?idRange=0-318" );
        console.log(result.data);
        res.render("index.ejs", {content: result.data.joke});        
    } catch (error) {
        console.log(error.response.data);
        res.render("index.ejs", {content: error});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
