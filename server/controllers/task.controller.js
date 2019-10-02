const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const Employee = mongoose.model('Employee');

module.exports = {
  index: (_req, res) => {
    Task.find({})
      .then(tasks => res.json(tasks))
      .catch(err => res.json(err))
  },
  show: (req, res) => {
    Task.findOne({ _id : req.params.id })
      .populate('teamMembers')
      .populate('notes')

      .then(data => res.json(data))
      .catch(err => res.json(err))
  },
  create: (req, res) => {
    req.body.dueDate += 'T12:00:00';
    Task.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },
  update: (req, res) => {
    Task.findOneAndUpdate({ _id : req.params.id },  req.body, {new : true})
      .then(data =>res.json(data))
      .catch(err => res.json(err));
  },
  destroy: (req, res) => {
    Task.findOneAndDelete({ _id : req.params.id })
      .then((task) => {
        Employee.update({_id : {$in : task.teamMembers}},
          {$pull : {tasks: task._id}})
          .then(data => {
            res.json(data);
          })
        res.json(task)})
      .catch(err => res.json(err))
  },
  addTeamMember: (req, res) => {
    Task.findOneAndUpdate({_id : req.params.id}, {$push : {teamMembers: req.body.employeeID}})
    .then(data => {
        res.json(data);
    })
    .catch(err => res.json(err));
  },
  removeTeamMember: (req, res) => {
      Task.findOneAndUpdate({_id : req.params.id}, {$pull : {teamMembers: req.body.employeeID}})
      .then(data => {
          res.json(data);
      })
      .catch(err => res.json(err));
  },
  getEmployeeTasks: (req, res) => {
    Task.find({'teamMembers._id' : req.params.id})
    .then(data => {
      res.json(data);
    })
    .catch(err => res.json(err))
  },
  addNote: (req, res) => {
    Task.findOneAndUpdate({_id: req.params.id}, {$push : {notes:req.body}})
      .then(data => {
        res.json(data);
      })
      .catch(err => res.json(err))
  },
}
