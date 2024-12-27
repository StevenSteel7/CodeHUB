'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';





 const getAllNotes = async (session: any) => {
  try {
    const response = await axios.get('http://localhost:8080/api/notes/get-all-notes', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': session.session.token,
      },
    });
    console.log(response.data);
    return response.data; // Return the data
  } catch (error) {
    console.error('Failed to fetch notes', error);
    return null; // Return null on error
  }
};







const AllNotesList = ({ session }: { session: any }) => {
  const [notes, setNotes] = useState<any[]>([]); // State to store notes
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      const data = await getAllNotes(session); // Call the fetch function
      if (data && data.notes) {
        setNotes(data.notes);
      }
      setLoading(false);
    };

    getNotes();
  }, [session]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="note-item">
            <p>{note.title || "Untitled"}</p>
         
          </div>
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default AllNotesList;
