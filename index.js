import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

var API = "https://v2.jokeapi.dev/joke/";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs", {joke: "Hello! Let's brighten up your day! 😅 ", delivery: ""})
});

app.post("/get-joke", async (req, res) => {
    const category = req.body.category;
    const type = req.body.single ? "single" : req.body.twopart ? "twopart" : "" ;
    try {
        let url =`${API}${category}` ;
        if (type) url += `?type=${type}`
        let result = await axios.get(url);
        console.log(result.data);

        if (result.data.type === "twopart") {
            res.render("index.ejs", {joke: result.data.setup, delivery: result.data.delivery});   
        } else {
            res.render("index.ejs", {joke: result.data.joke, delivery: "" });
        }      
    } catch (error) {
        console.log(error.response.data);
        res.render("index.ejs", {content: error});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
