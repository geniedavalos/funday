const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    index: async (_req, res) => {
        try {
            const employees = await Employee.find()
                    .populate('tasks')
                    .populate('managedProjects')
                    .populate('assignedProjects');
            res.json(employees);
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Employee.findById(req.params.id)
            .populate('tasks')
            .populate('managedProjects')
            .populate('assignedPojects')
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
                console.log("Logging new employee: ", newEmployee)
                res.json(newEmployee);
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
        })
    },
    update: (req, res) => {
        Employee.findOneAndUpdate({ _id : req.params.id }, { runValidators: true, context: 'query' }, req.body)
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
        Employee.updateOne({_id : req.params.id}, {$push : {tasks : req.body.taskID}})
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    },
    addProject: (req, res) => {
        console.log("Insider server addProject to assignedProjects");
        console.log("logging req.params.id",req.params.id);
        console.log("logging req.body",req.body);
        Employee.updateOne({_id : req.params.id}, {$push : {assignedProjects : req.body.projectID}})
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    }
}
