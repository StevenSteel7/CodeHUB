import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { SearchIcon, Trash, Undo } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Item from "./Item";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const TrashCan = ({
  isMobile,
  session,
  notes,
  setnotes,
  loading,
}: {
  isMobile: boolean;
  session: any;
  notes: any;
  setnotes: any;
  loading: any;
}) => {

  const [search, setSearch] = useState("");


  // For searching in notes
  const filteredNotes = notes.filter((note: any) => {
    return (
      note.isArchived === true &&
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  });
  



  const undoDelete = async (
    noteId: string,
    session: any,
    notes: any[],
    setNotes: (notes: any[]) => void
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/notes/soft-undelete/${noteId}`,
        {}, // content
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: session.session.token, // Include the session token in the 'header'
          },
        }
      );

      const updatedNotes = notes.map((note) =>
        note._id === noteId ? { ...note, isArchived: false } : note
      );
      setNotes(updatedNotes);
      toast.success("Note archived successfully");
      return response.data;
    } catch (error) {
      console.error("Failed to soft delete note", error);
      throw error;
    }
  };

  const Delete = async (
    noteId: string,
    session: any,
    notes: any[],
    setNotes: (notes: any[]) => void
  ) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/notes/delete/${noteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: session.session.token, // Include the session token in the 'header'
          },
        }
      );

      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
      toast.success("Note deleted successfully");
      return response.data;
    } catch (error) {
      console.error("Failed to delete note", error);
      toast.error("Failed to delete note");
      throw error;
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full mt-4">
        <Item label="Trash" icon={Trash} />
        <PopoverContent className="p-0 w-72" side={isMobile ? "bottom" : "bottom"}>
          <div className="space-x-1 p-2 flex items-center">
            <SearchIcon className="h-4 flex justify-center w-4" />
            
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
              placeholder="Filter by page title"
            />
          </div>

          {/* Search */}
          <div className="mt-2 px-1 pb-1" id = "For seaching in notes">
            <div className="flex flex-col align-center">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note: any) => (
                  <div key={note._id}>
                    <div className="flex justify-between w-full h-auto px-2 text-muted-foreground hover:bg-neutral-100 group-hover:opacity-100 dark:hover:bg-neutral-600">
                      <div
                        role="title"
                        className="flex items-center gap-x-2 truncate"
                      >
                        {note?.title}
                      </div>

                      <div className="flex items-center gap-x-2 p-2">
                        <Undo
                          className="h-4 w-4 cursor-pointer rounded-md hover:bg-neutral-200 group-hover:opacity-100 dark:hover:bg-neutral-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            undoDelete(note._id, session, notes, setnotes);
                          }}
                        />
                        <ConfirmModal
                          onConfirm={() =>
                            Delete(note._id, session, notes, setnotes)
                          }
                        >
                          <Trash
                            className="h-4 w-4 cursor-pointer rounded-md hover:bg-neutral-200 group-hover:opacity-100 dark:hover:bg-neutral-700"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </ConfirmModal>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  Trash box empty
                </p>)
              }
            </div>  
          </div>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
};

export default TrashCan;
