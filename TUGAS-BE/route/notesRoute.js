const express = require("express");
const { getNotes, addNote, updateNote, deleteNote, getNoteById } = require("../controller/notesController");
const route = express.Router();

route.get("/notes", getNotes);
route.get("/notes/:id", getNoteById);
route.post("/notes", addNote);
route.put("/notes/:id", updateNote);
route.delete("/notes/:id", deleteNote);

module.exports = route;
