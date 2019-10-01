const mongoose = require('mongoose');
const Project = mongoose.model('Project')
module.exports = {
    index: async (_req, res) => {
        try {
            const projects = await Project
                                    .find()
                                    .sort('dueDate')
                                    .populate({path:'tasks', populate: {path: 'teamMembers'}})
                                    .populate('teamMembers')
                                    .populate('projectLead');
            res.json(projects);
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Project.findById(req.params.id)
            .populate('teamMembers')
            .populate({path:'tasks', populate: {path: 'teamMembers'}})
            .populate('projectLead')
            .then((data) => {
                res.json(data)
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
      req.body.dueDate += 'T12:00:00';
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
        Project.findOneAndUpdate({ _id : req.params.id }, req.body, {new: true})
            .then((data) => {
                res.json(data);
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
        Project.findOneAndUpdate({_id : req.params.id}, {$push : {tasks: req.body.taskID}}, {new: true})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    removeTask: (req, res) => {
        Project.findOneAndUpdate({_id : req.params.id}, {$pull : {tasks: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    addTeamMember: (req, res) => {
        Project.findOneAndUpdate({_id : req.params.id}, {$push : {teamMembers: req.body}}, {new: true})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    removeTeamMember: (req, res) => {
        Project.findOneAndUpdate({_id : req.params.id}, {$pull : {teamMembers: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    getManagedProjects: (req, res) => {
        Project.find({'projectLead': req.params.id }).sort('dueDate')
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    }
}
