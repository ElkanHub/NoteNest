const Note = require("../models/notes.model.js");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/notes.custom-error.js");

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    throw new CustomError(
      "Error fetching notes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get a single note by ID
const getNote = async (req, res) => {
  const { id: noteId } = req.params;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      throw new CustomError(
        `No note found with ID: ${noteId}`,
        StatusCodes.NOT_FOUND
      );
    }
    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    if (error.name === "CastError") {
      throw new CustomError(
        `Invalid ID format: ${noteId}`,
        StatusCodes.BAD_REQUEST
      );
    }
    throw new CustomError(
      "Error fetching note",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
// Create a new note
const createNote = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    throw new CustomError(
      "Title and body are required",
      StatusCodes.BAD_REQUEST
    );
  }
  try {
    const note = await Note.create({ title, body });
    res.status(StatusCodes.CREATED).json({ note });
  } catch (error) {
    throw new CustomError(
      "Error creating note",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
// Update a note by ID
const updateNote = async (req, res) => {
  const { id: noteId } = req.params;
  const { title, body } = req.body;
  if (!title || !body) {
    throw new CustomError(
      "Title and body are required",
      StatusCodes.BAD_REQUEST
    );
  }
  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, body },
      { new: true, runValidators: true }
    );
    if (!note) {
      throw new CustomError(
        `No note found with ID: ${noteId}`,
        StatusCodes.NOT_FOUND
      );
    }
    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    if (error.name === "CastError") {
      throw new CustomError(
        `Invalid ID format: ${noteId}`,
        StatusCodes.BAD_REQUEST
      );
    }
    throw new CustomError(
      "Error updating note",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
// Delete a note by ID
const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      throw new CustomError(
        `No note found with ID: ${noteId}`,
        StatusCodes.NOT_FOUND
      );
    }
    res.status(StatusCodes.OK).json({ message: "Note deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      throw new CustomError(
        `Invalid ID format: ${noteId}`,
        StatusCodes.BAD_REQUEST
      );
    }
    throw new CustomError(
      "Error deleting note",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
// This code defines the controller functions for handling CRUD operations on notes in a Notes API.
// It uses Mongoose to interact with a MongoDB database and includes error handling using a custom error class.
// The functions handle fetching all notes, fetching a single note by ID, creating a new note, updating an existing note, and deleting a note.
// Each function responds with appropriate HTTP status codes and messages, ensuring a robust API design.
