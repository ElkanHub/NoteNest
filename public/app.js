const notesList = document.getElementById("notes-list");
const modal = document.getElementById("note-modal");
const addNoteBtn = document.getElementById("add-note-btn");
const closeModalBtn = document.getElementById("close-modal");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

const API_URL = "/api/notes"; // assuming same server

// Load all notes on page load
document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
});

// Open modal
addNoteBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  noteForm.reset();
});

// Submit new note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newNote = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
  };

  if (!newNote.title || !newNote.body) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });

    if (!res.ok) throw new Error("Failed to add note");

    modal.classList.add("hidden");
    noteForm.reset();
    loadNotes(); // refresh
  } catch (err) {
    console.error(err.message);
  }
});

// Load all notes from server
const loadNotes = async () => {
  notesList.innerHTML = "Loading...";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid notes format");

    if (data.length === 0) {
      notesList.innerHTML = `<p>No notes yet. Add one!</p>`;
      return;
    }

    notesList.innerHTML = data.map((note) => renderNote(note)).join("");
  } catch (err) {
    notesList.innerHTML = `<p>Error loading notes</p>`;
    console.error(err.message);
  }
};

// Create note card HTML
function renderNote(note) {
  return `
    <div class="note-card">
      ${note.pinned ? `<span class="pinned">📌</span>` : ""}
      <div class="note-title">${note.title}</div>
      <div class="note-body">${note.body}</div>
    </div>
  `;
}
