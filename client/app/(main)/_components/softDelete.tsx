import axios from 'axios';

const softDelete = async (noteId: string, session: any) => {
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
    return response.data;
  } catch (error) {
    console.error('Failed to soft delete note', error);
    throw error;
  }
};

export default softDelete;
