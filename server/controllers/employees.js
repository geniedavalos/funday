const mongoose = require('mongoose');
const Employee = mongoose.model('Employee')
module.exports = {
    all: async (req, res) => {
        try {
            const employees = await Employee.find().sort('type');
            res.json({employees: employees});
        }
        catch (err) {
            res.json(err);
        }
    },
    getOneById: (req, res) => {
        Employee.findById({ _id : req.params.id })
            .then((data) => {
                res.json({employee: data})
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        const employee = new Employee(req.body);
        employee.save()
            .then((data) => {
                res.json({newEmployee: data});
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Employee.updateOne({ _id : req.params.id }, { runValidators: true, context: 'query' }, req.body)
            .then((data) => {
                res.json({updatedEmployee: data});
            })
            .catch(err => res.json(err));
    },
    delete: (req, res) => {
        Employee.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
}
