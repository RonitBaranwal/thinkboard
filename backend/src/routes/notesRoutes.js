import express from "express";
import {
  createNote,
  deleteNote,
  editNote,
  getAllNote,
  getNoteById,
} from "./../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNote);
router.post("/", createNote);
router.put("/:id",editNote);
router.delete("/:id", deleteNote);
router.get('/:id', getNoteById);
export default router;
