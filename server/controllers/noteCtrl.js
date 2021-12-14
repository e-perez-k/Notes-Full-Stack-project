const Notes = require("../models/noteModel");

const noteCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ mensaje: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;

      const newNote = new Notes({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newNote.save();
      res.json({ mensaje: "Nota creada" });
    } catch (err) {
      return res.status(500).json({ mensaje: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ mensaje: "Nota borrada" });
    } catch (err) {
      return res.status(500).json({ mensaje: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          date,
        }
      );
      res.json({ mensaje: "Nota editada" });
    } catch (err) {
      return res.status(500).json({ mensaje: err.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ mensaje: err.message });
    }
  },
};

module.exports = noteCtrl;
