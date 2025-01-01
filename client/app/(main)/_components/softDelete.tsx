import axios from 'axios';
import { toast } from 'sonner';
/* here we take setNotes and notes form navigation => 
allNotesList and update the notes array if the note is deleted */



const softDelete = async (noteId: string, session: any, notes: any[], setNotes: (notes: any[]) => void) => {
  try {
    const response = await axios.patch(`http://localhost:8080/api/notes/soft-delete/${noteId}`, 
        {  },//content
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': session.session.token, // Include the session token in the 'header'
          },
        });
    console.log('Note soft deleted:', response.data);

    // update the notes array to reflect the soft delete
    const updatedNotes = notes.map(note => 
      note._id === noteId ? { ...note, isArchived: true } : note
    );
    setNotes(updatedNotes);
    toast.success('Note archived successfully');
    return response.data;

  } catch (error) {
    console.error('Failed to soft delete note', error);
    throw error;
  }
};

export default softDelete;
