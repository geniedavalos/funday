const mongoose = require('mongoose');
const Note = mongoose.model('Note')
module.exports = {
  index: (_req, res) => {
    Note.find({})
      .then(tasks => res.json(tasks))
      .catch(err => res.json(err))
  },
  show: (req, res) => {
    Note.findOne({ _id : req.params.id })
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },
  create: (req, res) => {
    console.log("note controller ", req.body)
    Note.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },
  update: (req, res) => {
    Note.updateOne({ _id : req.params.id }, { runValidators: true, context: 'query' }, req.body)
      .then(data =>res.json(data))
      .catch(err => res.json(err));
  },
  destroy: (req, res) => {
    Note.findOneAndDelete({ _id : req.params.id })
      .then((data) => res.json(data))
      .catch(err => res.json(err))
  },

}
