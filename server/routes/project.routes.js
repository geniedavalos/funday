const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');

router.get('/', projects.index)
    .get('/:id', projects.show)
    .post('/', projects.create)
    .put('/:id', projects.update)
    .delete('/:id', projects.destroy)

module.exports = router;