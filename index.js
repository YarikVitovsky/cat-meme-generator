import express from "express";
import axios from "axios";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const catRes = await axios.get("https://api.thecatapi.com/v1/images/search");
        const jokeRes = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
        const catImage = catRes.data[0].url;
        const joke = jokeRes.data.joke;

        res.render("index", { catImage, joke });
    } catch (error) {
        console.error(error);
        res.send("Error fetching data 😿");
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));