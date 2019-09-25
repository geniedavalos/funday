const mongoose = require('mongoose');
const Task = mongoose.model('Task')
module.exports = {
  index: (_req, res) => {
    Task.find({})
      .then(tasks => res.json(tasks))
      .catch(err => res.json(err))
  },
  show: (req, res) => {
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
  destroy: (req, res) => {
    Task.findOneAndDelete({ _id : req.params.id })
      .then((data) => res.json(data))
      .catch(err => res.json(err))
  },
  addTeamMember: (req, res) => {
    console.log("inside addTeamMember to Task method", req.body)
    Task.updateOne({_id : req.params.id}, {$push : {teamMembers: req.body}})
    .then(data => {
        res.json(data);
    })
    .catch(err => res.json(err));
  },
  removeTeamMember: (req, res) => {
      console.log("insde removeTeamMmber from Task method", req.body)
      Task.updateOne({_id : req.params.id}, {$pull : {teamMembers: req.body}})
      .then(data => {
          res.json(data);
      })
      .catch(err => res.json(err));
  },
}
