import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotesPage = ({ session }: { session: any }) => {
  const [notes, setNotes] = useState<any[]>([]); // State to store notes
  const [loading, setLoading] = useState(true); // Loading indicator

  // Fetch all notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/notes/get-all-notes', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': session.session.token,
          },
        });
        setNotes(response.data.notes || []); // Populate the notes array
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
      setLoading(false);
    };

    fetchNotes();
  }, [session]);

  // Function to create a new note
  const createNewNote = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/notes/create-note',
        { title: 'Untitled', content: '' }, // New note data
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': session.session.token,
          },
        }
      );

      const newNote = response.data; // Get the newly created note
      setNotes((prevNotes) => [newNote, ...prevNotes]); // Add new note to state
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      <button onClick={createNewNote} className="create-button">
        Create
      </button>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-item">
            <h1>{note.title || 'Untitled'}</h1>
            <p>{note.content || 'No content available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
