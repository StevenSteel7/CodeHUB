import mongoose  from 'mongoose';

const NoteSchema = new mongoose.Schema({
  
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,  /* to connected with a user */
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema,'Note');
export default Note;