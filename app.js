const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

const skills = require("./extra/skills");

//google sheet api
const fs = require("fs");

const googleSheetFunc = require("./extra/googleSheet");
const googleCredentials = require("./config/keys_prod").googleCredentials;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
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
  const formData = req.body;
  console.log(req.body);

  if (process.env.NODE_ENV === "production") {
    // Authorize a client with credentials, then call the Google Sheets API.
    googleSheetFunc.authorize(
      JSON.parse(googleCredentials),
      formData,
      googleSheetFunc.getTouch
    );

    res.send({ status: "succes", message: "Message succesfully sented" });
  } else {
    // Load client secrets from a local file.
    fs.readFile("credentials.json", (err, content) => {
      if (err) {
        res.send({ status: "error", message: "something went wrong" });
        return console.log("Error loading client secret file:", err);
      }
      // Authorize a client with credentials, then call the Google Sheets API.
      googleSheetFunc.authorize(
        JSON.parse(content),
        formData,
        googleSheetFunc.getTouch
      );

      res.send({ status: "succes", message: "Message succesfully sented" });
    });
  }
});

app.get("/wedding", (req, res) => {
  res.render("wedding");
});

app.post("/submit", (req, res) => {
  const { name } = req.body;
  console.log(name);
  res.send({ done: "True", name: name });

  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    googleSheetFunc.authorize(
      JSON.parse(content),
      name,
      googleSheetFunc.listMajors
    );
  });
});

app.listen(process.env.PORT || 3000, console.log("server is running"));
