const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
import { isEmail } from 'validator';
const EmployeeSchema = new mongoose.Schema({
    first_name: { type: String, minlength: [2, 'First name must be at least 2 characters.']},
    last_name: { type: String, minlength: [2, 'Last name must be at least 2 characters.']},
    email: {
      type: String,
      validate: [ isEmail, 'Enter a valid email' ],
      unique: true
    },
    password: { type: String, minlength: [3, 'Password must be at least 3 characters long.']},
    isManager: { type: Boolean, default: false },
    department: { type: String, required: false },
    project: { type: mongoose.Schema.Types.ObjectId, ref : 'Project' },
    tasks: [ {type : mongoose.Schema.Types.ObjectId, ref : 'Task'} ],
}, {timestamps: true });
EmployeeSchema.plugin(uniqueValidator, { message: 'Employee {PATH} must be unique.'});
mongoose.model('Employee', EmployeeSchema);
