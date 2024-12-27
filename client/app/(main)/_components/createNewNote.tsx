
import { useSession } from "@/context/sessionContext";

import axios from 'axios';

const createNewNote = async (session: any) => {
    console.log(session.session.token);

    try {


    const response = await axios.post('http://localhost:8080/api/notes/create-note', 
      { title: 'Untitled', content: '' },//content
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session.session.token, // Include the session token in the 'header'
        },
      }
    );

/*  const allNotes = await axios.get('http://localhost:8080/api/notes/get-all-notes'); */
   


console.log('New note created:', response.data);
    // Update the UI to reflect the new note
  } catch (error) {
    console.error('Failed to create note', error);
  } 

    
};

export default createNewNote;