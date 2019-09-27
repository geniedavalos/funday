const mongoose = require('mongoose');
const Employee = require('./employee');
const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: [3, 'Content must be at least 3 characters long.'],
  },
  sender: {firstName: String, lastName : String},
}, {timestamps: true });
mongoose.model('Note', NoteSchema);
module.exports = NoteSchema;
