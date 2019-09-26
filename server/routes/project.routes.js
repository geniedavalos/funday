const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');

router.get('/', projects.index)
    .get('/:id', projects.show)
    .post('/', projects.create)
    .put('/:id', projects.update)
    .delete('/:id', projects.destroy)
    .put('/:id/addTask', projects.addTask)
    .put('/:id/removeTask', projects.removeTask)
    .put('/:id/addTeamMember', projects.addTeamMember)
    .put('/:id/removeTeamMember', projects.removeTeamMember)
    .get('/getManagedProjects/:id', projects.getManagedProjects)

module.exports = router;
