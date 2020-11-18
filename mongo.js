const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const app = express();

mongoose.connect("mongodb://localhost:27017/note-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to database via mongoose");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

//create a note object
const note = new Note({
  content: "DELETE and POST are the most important methods of HTTP protocol",
  date: "2019-05-30T19:20:14.298Z",
  important: true,
});

//save the note to the database
note.save().then((result) => {
  console.log(note);
  mongoose.connection.close();
});

Note.find({ important: true }).then((result) => {
  result.map((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
