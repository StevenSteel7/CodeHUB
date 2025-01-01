import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Item from "./Item"
import { SearchIcon, Trash ,Undo} from "lucide-react"
import { Input } from "@/components/ui/input"
import {  useState } from "react"
import axios from "axios"
import { toast } from "sonner"


const TrashCan = ( { session, notes, setnotes, loading }: { session: any, notes: any, setnotes: any, loading: any }) => {
    const [search, setSearch] = useState("");


    const undoDelete = async (noteId: string, session: any, notes: any[], setNotes: (notes: any[]) => void) => {
        try {
          const response = await axios.patch(`http://localhost:8080/api/notes/soft-undelete/${noteId}`, 
              {  },//content
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': session.session.token, // Include the session token in the 'header'
                },
              });
          console.log('Note soft deleted:', response.data);
      
          // update the notes array to reflect the soft undelete
          const updatedNotes = notes.map(note => 
            note._id === noteId ? { ...note, isArchived: false } : note
          );
          setNotes(updatedNotes);
          toast.success('Note archived successfully');
          return response.data;
      
        } catch (error) {
          console.error('Failed to soft delete note', error);
          throw error;
        }
      }

      const Delete = async (noteId: string, session: any, notes: any[], setNotes: (notes: any[]) => void) => {
        try {
          const response = await axios.delete(`http://localhost:8080/api/notes/delete/${noteId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': session.session.token, // Include the session token in the 'header'
            },
          });
          console.log('Note deleted:', response.data);
      
          // Update the notes array to remove the deleted note
          const updatedNotes = notes.filter(note => note._id !== noteId);
          setNotes(updatedNotes);
          toast.success('Note deleted successfully');
          return response.data;
        } catch (error) {
          console.error('Failed to delete note', error);
          toast.error('Failed to delete note');
          throw error;
        }
      };
    
  return (
    <Popover>
        <PopoverTrigger className="w-full mt-4">
            <Item label="Trash"icon={Trash}/>
            <PopoverContent className="p-0 w-72" side = 'right'/* {isMobile?"bottom":"right"} */ >
                <div className="space-x-1 p-2 flex items-center">
                    <SearchIcon className="h-4 flex justify-center w-4"/>
                    <Input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                        className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                        placeholder="Filter by page title"/>
                    
                </div>

                
                <div className="mt-2 px-1 pb-1">
                    {
                        /* notes.map((note: any) => (
                            note.isArchived && (
                                <Item
                                
                                    key={note._id}
                                    label={note.title}
                                    onClick={() => {
                                    }}
                                />
                        ))) */
                       
                   }

                   <div className="flex flex-col align-center">

                        {notes.length > 0 ? (     // only if notes are not archived
                            notes.map((note: any) => ( note.isArchived == true &&(
                                <div key={note._id}>
                                    <div className="flex justify-between w-full h-auto px-2  text-muted-foreground hover:bg-neutral-100 group-hover:opacity-100 dark:hover:bg-neutral-600">
                        
                                        <div role="title" className="flex items-center gap-x-2 truncate" >
                                           {note?.title} 
                                        </div>
                        
                                        <div className="flex items-center gap-x-2 p-2 ">
                                            <Undo className="h-4 w-4 cursor-pointer rounded-md hover:bg-neutral-200 group-hover:opacity-100 dark:hover:bg-neutral-700"
                                            onClick={(e) => { e.stopPropagation(); 
                                                            undoDelete(note._id, session, notes, setnotes);}} />
                                            <Trash className="h-4 w-4 cursor-pointer rounded-md hover:bg-neutral-200 group-hover:opacity-100 dark:hover:bg-neutral-700" 
                                            onClick={(e) => {e.stopPropagation();
                                                             Delete(note._id, session, notes, setnotes);}}/>
                                        </div>
                        
                                    </div>
                        
                                    
                                </div>
                            ))))
                                : (<p className="text-sm text-center text-muted-foreground">Trash box empty</p>)    
                        }
                    </div>
                    

                </div>
            </PopoverContent>
        </PopoverTrigger>
    </Popover>  
  )
}

export default 
TrashCan