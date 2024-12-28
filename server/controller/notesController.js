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

  })}
 
 
  export const softDeleteNote = async (req, res) => {
    try {
      const userId = req.userId; // Retrieved from requireSignIn middleware
      const { noteId } = req.params; // Extract noteId from URL parameters
  
      // Validate input
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized user' });
      }
      if (!noteId) {
        return res.status(400).json({ error: 'Note ID is required' });
      }
  
      // Update the `isArchive` field for the specified note
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId, userId: userId }, // Match by note ID and user ID
        { $set: { isArchived: true } },   // Set isArchive to true
        { new: true }                    // Return the updated document
      );
  
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found or not authorized' });
      }
  
      res.status(200).json({
        message: 'Note archived successfully',
        note: updatedNote, // Include the updated note in the response
      });
    } catch (error) {
      console.error('Error archiving the note:', error);
      res.status(500).json({
        error: 'Failed to archive the note',
        details: error.message,
      });
    }
  };
  
  export const softUnDeleteNote = async (req, res) => {
    try {
      const userId = req.userId; // Retrieved from requireSignIn middleware
      const { noteId } = req.params; // Extract noteId from URL parameters
  
      // Validate input
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized user' });
      }
      if (!noteId) {
        return res.status(400).json({ error: 'Note ID is required' });
      }
  
      // Update the `isArchive` field for the specified note
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId, userId: userId }, // Match by note ID and user ID
        { $set: { isArchived: false } },   // Set isArchive to true
        { new: true }                    // Return the updated document
      );
  
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found or not authorized' });
      }
  
      res.status(200).json({
        message: 'Note archived successfully',
        note: updatedNote, // Include the updated note in the response
      });
    } catch (error) {
      console.error('Error archiving the note:', error);
      res.status(500).json({
        error: 'Failed to archive the note',
        details: error.message,
      });
    }
  };
  