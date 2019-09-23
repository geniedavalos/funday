const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, minlength: [3, 'Employee name must be at least 3 characters long.'], unique: true },
    type: { type: String, minlength: [3, 'Employee type must be at least 3 characters long.']},
    description: { type: String, minlength: [3, 'Employee description must be at least 3 characters long.']},
    skills: {
      skill1: { type: String, required: false },
      skill2: { type: String, required: false },
      skill3: { type: String, required: false },
    },
    likes: { type: Number, default: 0 }
}, {timestamps: true });
EmployeeSchema.plugin(uniqueValidator, { message: 'Employee {PATH} must be unique.'});
mongoose.model('Employee', EmployeeSchema);
