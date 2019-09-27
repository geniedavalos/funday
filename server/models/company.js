const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Employee = require('./employee');
const Project = require('./project');
const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'Company name must be at least 2 characters long.'],
        required: [true, "Please provide a company name."],
        trim: true,
        unique: true
    },
    owner: { type: Employee },
    departments: [String],
    employees: [ { type : mongoose.Schema.Types.ObjectId, ref : 'Employee' } ],
    projects: [ { type : mongoose.Schema.Types.ObjectId, ref : 'Project' } ],
}, {timestamps: true });
CompanySchema.plugin(uniqueValidator, { message: 'Company {PATH} must be unique.'});
mongoose.model('Company', CompanySchema);
