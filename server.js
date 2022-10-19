const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/{{__title__}}/, "Sakamoto - Watch Popular Anime Online");
    data = data.replace(/{{__description__}}/, "Sakamoto - Watch Popular Anime Online");
    data = data.replace(/{{__image__}}/, "https://media.discordapp.net/attachments/1009328245533065288/1009328327909199904/8.png");


    res.send(data);
  });
});

app.get("/popular", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/{{__title__}}/, "Popular Anime");
    data = data.replace(/{{__description__}}/, "Sakamoto - Watch Popular Anime Online");
    data = data.replace(/{{__image__}}/, "https://media.discordapp.net/attachments/1009328245533065288/1009328327909199904/8.png");

    res.send(data);
  });
});

app.get("/search", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  let urlParams = useParams().name;
  fs.readFile(filePath, "utf8", async function (err, data) {
    if (err) {
      return console.log(err);
    }
    let res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}search?keyw=${urlParams}`
    );
    data = data.replace(/{{__title__}}/, "Search results for " + res.data.animeTitle);
    data = data.replace(/{{__description__}}/, "Sakamoto - Watch Popular Anime Online");
    data = data.replace(/{{__image__}}/, "https://media.discordapp.net/attachments/1009328245533065288/1009328327909199904/8.png");

    res.send(data);
  });
});

app.get("/category", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  let slug = useParams().slug;

  fs.readFile(filePath, "utf8", async function (err, data) {
    if (err) {
      return console.log(err);
    }
    let res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}anime-details/${slug}`
    );
    data = data.replace(/{{__title__}}/, res.data.animeTitle);
    data = data.replace(/{{__description__}}/, res.data.synopsis);
    data = data.replace(/{{__image__}}/, res.data.animeImg);

    res.send(data);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/{{__title__}}/, "404 Not found");
    data = data.replace(/{{__description__}}/, "Sakamoto - Watch Popular Anime Online");
    data = data.replace(/{{__image__}}/, "https://media.discordapp.net/attachments/1009328245533065288/1009328327909199904/8.png");

    res.send(data);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
