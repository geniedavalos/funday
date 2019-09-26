const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: [3, 'Content must be at least 3 characters long.'],
  },
  sender:  {type : mongoose.Schema.Types.ObjectId, ref : 'Employee'},
}, {timestamps: true });
mongoose.model('Note', NoteSchema);
module.exports = NoteSchema;
