const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    minlength: [3, 'Title must be at least 3 characters long.'], 
    unique: true 
  },
  description: { 
    type: String, 
    minlength: [3, 'Description type must be at least 3 characters long.']
  },
  dueDate: { 
    type: Date
  },
  progress: { 
    type: Number, 
    default: 0 
  },
  teamMember:  [ {type : mongoose.Schema.Types.ObjectId, ref : 'Employee'} ],
}, {timestamps: true });
TaskSchema.plugin(uniqueValidator, { message: 'Task must be unique within a project'});
mongoose.model('Tasks', TaskSchema);
