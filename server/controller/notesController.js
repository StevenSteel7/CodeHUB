import mongoose from 'mongoose';
import Note from '../models/notesModel.js'; // Adjust path to your Note model


  export const createNotesController = async (req, res) => {
    try {
   
      // Extract the token from the request headers

      console.log(req.userId);

      const userId = req.userId; // Get the userId from the request object

  
      const newNote = new Note({
        title: req.body.title || 'New Note', // Use title from request body or default to 'New Note'
        content: req.body.content || '', // Use content from request body or default to empty string
        isPinned: req.body.isPinned || false, // Default to false if not provided
        isArchived: req.body.isArchived || false, // Default to false if not provided
        userId:  userId, // Cast userId to ObjectId 
        createdAt: new Date(), // Set the current date as the default value
        updatedAt: new Date(), // Set the current date as the default value
      });
      await newNote.save();

      res.status(200).json({ 
        message: 'Note created successfully',
        notes: newNote, // Include the new note in the response
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const getNotes= (req, res)=>{
  const userId = req.userId;

  Note.find({userId: userId}).then((notes)=>{
    res.status(200).json({
      notes: notes
    });

  })
 


  /* {
  "notes": [
    { "_id": "1", "title": "Note 1", "content": "Content 1", "userId": "12345" },
    { "_id": "2", "title": "Note 2", "content": "Content 2", "userId": "12345" }
  ]
} */

  };
