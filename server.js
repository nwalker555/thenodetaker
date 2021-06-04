const fs = require('fs');
const path = require('path');
const express = require ('express');
const database = require("./db/db.json");
console.log(database);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
require("./routes/routes")(app)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("./notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});