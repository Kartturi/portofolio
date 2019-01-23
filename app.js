const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

const skills = require("./extra/skills");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects", (req, res) => {
  res.writeHead(200, {
    "Content-Type": mimeType,
    "Content-Length": contents.length,
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-cache"
  });
  res.render("projects");
});

app.get("/skills", (req, res) => {
  res.send(skills);
});

app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  res.send({ name, email, phone, message });
});

app.listen(3000, console.log("listening port 3000"));
