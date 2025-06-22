const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Note = mongoose.model("Note", NotesSchema);
module.exports = Note;
// This code defines a Mongoose schema for a Note model in a MongoDB database.
// The schema includes fields for the title and body of the note, both of which are required.
// The schema also includes timestamps to automatically track when the note was created and last updated.