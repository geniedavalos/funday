const mongoose = require('mongoose');
const Company = mongoose.model('Company')
module.exports = {
    index: async (_req, res) => {
        try {
            const companies = await Company.find().sort('type');
            res.json(companies);
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Company.findById(req.params.id)
            .then((data) => {
                res.json(data)
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        console.log("creating company", req.body)
        Company.create(req.body)
            .then((data) => {
                console.log("Logging new company data", data)
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        console.log("Inside updateOne function.  Logging req.body...", req.body)
        Company.updateOne({ _id : req.params.id }, { runValidators: true, context: 'query' }, )
            .then((data) => {
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    addEmployee: (req, res) => {
        console.log("inside addEmployee function. logging req.body...", req.body)
        Company.updateOne({_id : req.params.id}, {$push : req.body})
        .then(data => {
            console.log("Logging data after 'pushing' employee into company", data);
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    destroy: (req, res) => {
        Company.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
}
