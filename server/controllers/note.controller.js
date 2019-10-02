const mongoose = require('mongoose');
const Note = mongoose.model('Note')
const Employee = mongoose.model('Employee');
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
    var newNote = new Note();
    newNote.content = req.body.content;
    Employee.findOne({_id:req.body.sender})
      .then(data =>{
        newNote.sender={firstName: data.firstName, lastName : data.lastName}
        newNote.save()
               .then(data => res.json(data))
               .catch(err => res.json(err))
      })
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
