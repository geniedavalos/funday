
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    index: async (_req, res) => {
        try {
            const employees = await Employee.find()
                    .populate({path:'tasks', populate: {path: 'teamMembers'}})
                    .populate('managedProjects')
                    .populate({path:'assignedProjects', populate: {path: 'teamMembers'}});
            res.json(employees);
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Employee.findById(req.params.id)
            .populate({path:'tasks', populate: {path: 'teamMembers'}})
            .populate('managedProjects')
            .populate({path:'assignedProjects', populate: {path: 'teamMembers'}})
            .then((data) => {
                res.json(data)
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            const employee = new Employee(req.body);
            employee.password = hashedPassword;
            employee.save()
            .then((newEmployee) => {
                res.json(newEmployee);
            })
            .catch(err => {
                res.json(err)
            });
        })
    },
    update: (req, res) => {
        Employee.findOneAndUpdate({ _id : req.params.id }, req.body, { new: true })
            .then((updatedEmployee) => {
                res.json(updatedEmployee);
            })
            .catch(err => res.json(err));
    },
    destroy: (req, res) => {
        Employee.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
    addTask: (req, res) => {
        Employee.findOneAndUpdate({_id : req.params.id}, {$push : {tasks : req.body.taskID}}, { new: true })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    },
    addProject: (req, res) => {
        Employee.findOneAndUpdate({_id : req.params.id}, {$push : {assignedProjects : req.body.projectID}}, { new: true })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    },
    addManagedProject: (req, res) => {
        Employee.findOneAndUpdate({_id : req.params.id}, {$push : {managedProjects : req.body.projectID}}, { new: true })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    },
  promoteToManager : (req, res) =>{
    Employee.findOneAndUpdate({_id : req.params.id}, {$set : {isManager : true}})
      .then((data) => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      })
  }

}
