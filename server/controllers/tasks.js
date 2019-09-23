const mongoose = require('mongoose');
const Task = mongoose.model('Tasks')
module.exports = {
  all: (req, res) => {
    Task.find({})
      .then(tasks => res.json(tasks))
      .catch(err => res.json(err))
  },
  getOneById: (req, res) => {
    Task.findOne({ _id : req.params.id })
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },
  create: (req, res) => {
    const Task = new Task(req.body)
    Task.save()
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },
  update: (req, res) => {
    Task.updateOne({ _id : req.params.id }, { runValidators: true, context: 'query' }, req.body)
      .then(data =>res.json(data))
      .catch(err => res.json(err));
  },
  delete: (req, res) => {
    Task.findOneAndDelete({ _id : req.params.id })
      .then((data) => res.json(data))
      .catch(err => res.json(err))
  },
}
