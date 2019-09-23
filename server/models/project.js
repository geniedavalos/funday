import {EmployeeSchema} from '../models/employee'
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minlength: [3, 'Project name must be at least 3 characters long.'], 
        required: [true, "Please provide a project title."], 
        unique: true 
    },
    description: { 
        type: String,
        required: [true, "Please provide a project description."], 
        minlength: [3, 'Project description must be at least 3 characters long.']
    },
    dueDate:{
        type: Date,
        required: [true, "Please provide a target completion date."]
    },
    progress:{
        type: Number,
    },
    isComplete:{
        type: Boolean,
    },
    projectLead: { type: mongoose.Schema.Types.ObjectId, ref : 'Employee' },
    teamMembers: [EmployeeSchema]
}, {timestamps: true });
ProjectSchema.plugin(uniqueValidator, { message: 'Project {PATH} must be unique.'});
mongoose.model('Project', ProjectSchema);