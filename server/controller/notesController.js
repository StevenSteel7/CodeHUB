const express = require("express");
const Note = require("../models/Note"); // Adjust path to your Note model
const authenticateUser = require("../middleware/authenticate"); // Adjust path to your auth middleware

const router = express.Router();

router.post("/notes", authenticateUser, async (req, res) => {
  try {
    const { user } = req.auth; // `authMiddleware` attaches `user` to `req.auth`
    const { title, content } = req.body;

    // Validate request body
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    // Create a new note
    const newNote = new Note({
      title,
      content,
      user: user.id, // Associate the note with the logged-in user
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "An error occurred while creating the note." });
  }
});

module.exports = router;
