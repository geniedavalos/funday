const mongoose = require('mongoose');
const Company = mongoose.model('Company')
module.exports = {
    index: async (_req, res) => {
        try {
            const companies = await Company.find().sort('type');
            res.json({Companies: companies});
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Company.findById(req.params.id)
            .then((data) => {
                res.json({Company: data})
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        console.log("creating company", req.body)
        Company.create(req.body)
            .then((data) => {
                console.log("Logging new company data", data)
                res.json({newCompany: data});
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Company.findOneAndUpdate({ _id : req.params.id }, { runValidators: true, context: 'query' }, req.body)
            .then((data) => {
                res.json({updatedCompany: data});
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
