import Note from "../models/Note.js";

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(200).json({ newNote });
  } catch (error) {
    console.log("error in note creation", error);
    res
      .status(500)
      .json({ message: "There is an error", error: error.message });
  }
}
export async function getAllNote(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json({ notes });
  } catch (error) {
    res.json({ message: error });
  }
}
export async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return console.error("Note not found");
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Note not found" });
  }
}
export async function editNote(req, res) {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const editedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "note updated success",
      editedNote,
    });
  } catch (error) {
    console.log("There was error in node updation");
    res.status(500).json({ message: "There was an internal error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ message: `The note with given id ${id} is not found` });
    }
    res.send("The note with id is: ", note);
  } catch (err) {
    res.send(err);
  }
}
