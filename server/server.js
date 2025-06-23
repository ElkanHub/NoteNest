require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const notesRouter = require("./routers/notes.routes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//global error handler
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

//public folder for static files
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

//use routes
app.use("/api/notes", notesRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Notes API");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
