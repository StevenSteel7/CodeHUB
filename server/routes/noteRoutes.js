import express from "express";
import  {createNotesController} from "../controller/notesController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";


const router = express.Router();

//routes
router.post("/create-note",requireSignIn,createNotesController);



export default router;
