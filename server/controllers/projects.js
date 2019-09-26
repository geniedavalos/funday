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
      console.log('in projects controller, creating, reqbody:', req.body);
      Project.create(req.body)
        .then(data => {
          console.log(data);
          res.json(data);
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        })
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
    addTask: (req, res) => {
        console.log("inside addTask to Project method", req.body)
        Project.updateOne({_id : req.params.id}, {$push : {tasks: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    removeTask: (req, res) => {
        console.log("insde removeTask from Project method", req.body)
        Project.updateOne({_id : req.params.id}, {$pull : {tasks: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    addTeamMember: (req, res) => {
        console.log("inside addTeamMember to Project method", req.body)
        Project.updateOne({_id : req.params.id}, {$push : {teamMembers: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    removeTeamMember: (req, res) => {
        console.log("insde removeTeamMmber from Project method", req.body)
        Project.updateOne({_id : req.params.id}, {$pull : {teamMembers: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    getManagedProjects: (req, res) => {
        Project.find({'projectLead': req.params.id })
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    }
}
