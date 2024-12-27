import express from "express";
import  {createNotesController, getNotes} from "../controller/notesController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";


const router = express.Router();

//routes
router.post("/create-note",requireSignIn,createNotesController);
router.get("/get-all-notes",requireSignIn,getNotes);



export default router;
