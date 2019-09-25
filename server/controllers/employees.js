const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const jwt = require('jsonwebtoken');
module.exports = {
    index: async (_req, res) => {
        try {
            const employees = await Employee.find();
            res.json(employees);
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Employee.findById(req.params.id)
            .then((data) => {
                res.json(data)
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        console.log("inside create");
        console.log(req.body);
        Employee.create(req.body)
            .then((newEmployee) => {
                console.log("logging data", newEmployee)
                res.json(newEmployee);
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
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
}
