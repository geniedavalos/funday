const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const emailValidator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String, minlength: [2, 'First name must be at least 2 characters.']},
    lastName: { type: String, minlength: [2, 'Last name must be at least 2 characters.']},
    email: {
      type: String,
      required: [true, 'Enter a valid email.'],
      trim: true,
      // unique: true,
      validate: {
        validator(value) {
          return emailValidator.isEmail(value);
        },
        message: 'Enter a valid email.',
      },
    },
    password: { type: String, minlength: [8, 'Password must be at least 8 characters long.']},
    isManager: { type: Boolean, default: false },
    department: { type: String, required: false },
    managedProjects: [ { type : mongoose.Schema.Types.ObjectId, ref : 'Project' } ],
    assignedProjects: [ { type : mongoose.Schema.Types.ObjectId, ref : 'Project' } ],
}, {timestamps: true });
EmployeeSchema.plugin(uniqueValidator, { message: 'Employee {PATH} must be unique.'})
  .pre('validate', function (next) {
    if(!this.isModified(this.password)) {
      return next();
    }
    bcrypt
      .hash(this.password, saltRounds)
      .then(hashed => {
        this.password = hashed;
        next();
      })
      .catch(next);
});

EmployeeSchema.statics.validatePassword = function(candidate, hashed) {
  return bcrypt.compare(candidate, hashed);
};

mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeSchema;

