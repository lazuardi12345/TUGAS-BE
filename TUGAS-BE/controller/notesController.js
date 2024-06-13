const { query } = require("../database/Db");

const getNotes = async (req, res) => {
  try {
    const result = await query("SELECT * FROM notes");
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ pesan: "Internal server error", error });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM notes WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ pesan: "Note not found" });
    }
    return res.status(200).json({ data: result[0] });
  } catch (error) {
    return res.status(500).json({ pesan: "Internal server error", error });
  }
};

const addNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  try {
    await query("INSERT INTO notes (title, datetime, note) VALUES(?, ?, ?)", [title, datetime, note]);
    return res.status(200).json({
      pesan: "Penambahan note berhasil",
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ pesan: "Internal server error", error });
  }
};

const updateNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  const { id } = req.params;
  try {
    const result = await query("UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?", [title, datetime, note, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ pesan: "Note not found" });
    }
    return res.status(200).json({
      pesan: "Perubahan note berhasil",
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ pesan: "Internal server error", error });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM notes WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ pesan: "Note not found" });
    }
    return res.status(200).json({
      pesan: "Hapus note berhasil",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ pesan: "Internal server error", error });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
};
