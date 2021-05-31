const path = require('path');
const fs = require('fs');

module.exports = app => {
    fs.readFile("db/db.json","utf8",(err, data) => {

        if (err) throw err;
        let notes = JSON.parse(data);

        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Adding new note: " + newNote.title);
        });

        app.get("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });

        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "/notes.html"));
        });

        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "/index.html"));
        });

        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes, '/t'),err => {
                if (err) throw err;
                return true;
            });
        };
    });
}