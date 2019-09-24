const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Employee = require('./employee');
const Project = require('./project');
const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Company name must be at least 2 characters long.'],
        required: [true, "Please provide a company name."],
        unique: true
    },
    owner: { type: Employee },
    employees: [Employee],
    projects: [Project],
}, {timestamps: true });
CompanySchema.plugin(uniqueValidator, { message: 'Company {PATH} must be unique.'});
mongoose.model('Company', CompanySchema);
