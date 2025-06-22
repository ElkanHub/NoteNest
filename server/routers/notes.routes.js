const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

// Get all notes
router.get("/", getNotes);
// Get a single note by ID
router.get("/:id", getNote);
// Create a new note
router.post("/", createNote);
// Update a note by ID
router.put("/:id", updateNote);
// Delete a note by ID
router.delete("/:id", deleteNote);

// Export the router
module.exports = router;
// This code defines the routes for the Notes API, allowing CRUD operations on notes.
// It uses Express.js to handle HTTP requests and maps them to the appropriate controller functions.
