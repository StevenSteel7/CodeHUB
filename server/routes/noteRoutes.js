import express from "express";
import  {createNotesController, DeleteNote, getNotes ,softDeleteNote,softUnDeleteNote} from "../controller/notesController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";


const router = express.Router();

//routes
router.post("/create-note",requireSignIn,createNotesController);
router.get("/get-all-notes",requireSignIn,getNotes);
router.patch("/soft-delete/:noteId",requireSignIn,softDeleteNote);
router.patch("/soft-undelete/:noteId",requireSignIn,softUnDeleteNote);
router.delete("/delete/:noteId", requireSignIn, DeleteNote);

 

export default router;
