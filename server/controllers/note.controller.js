const Note = require('../models/note.model');

class noteController {
  async create(req, res) {
    console.log(req.body.text);
    const { text, date } = req.body;
    if (!text) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    const note = await Note.create({ text, date });
    return res.json(note);
  }

  async getAll(req, res) {
    const notes = await Note.findAll({ attributes: ['id', 'createdAt', 'text', 'date'] });
    return res.json({ ...notes });
  }

  async getById(req, res) {
    const { id } = req.params;
    const note = await Note.findAll({
      attributes: ['id', 'createdAt', 'text', 'date'],
      where: {
        id: id,
      },
    });
    return res.json(note);
  }

  async deleteById(req, res) {
    const { id } = req.params;
    console.log(id);
    Note.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: 'Note was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot delete Note with id=${id}. Maybe Tutorial was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Note with id=' + id,
        });
      });
  }

  async deleteAll(req, res) {
    Note.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Notes were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while removing all notes.',
        });
      });
  }
}

module.exports = new noteController();
