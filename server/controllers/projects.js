const mongoose = require('mongoose');
const Project = mongoose.model('Project')
module.exports = {
    index: async (_req, res) => {
        try {
            const Projects = await Project.find().sort('type');
            res.json({Projects: Projects});
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Project.findById(req.params.id)
            .then((data) => {
                res.json({Project: data})
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        const Project = new Project(req.body);
        Project.save()
            .then((data) => {
                res.json({newProject: data});
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Project.findOneAndUpdate({ _id : req.params.id }, { runValidators: true, context: 'query' }, req.body)
            .then((data) => {
                res.json({updatedProject: data});
            })
            .catch(err => res.json(err));
    },
    destroy: (req, res) => {
        Project.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
}