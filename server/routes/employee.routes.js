const express = require('express');
const router = express.Router();
const employees = require('../controllers/employee.controller');

router.get('/', employees.index)
    .get('/:id', employees.show)
    .post('/', employees.create)
    .put('/:id', employees.update)
    .delete('/:id', employees.destroy)
    .put('/:id/addTask', employees.addTask)
    .put('/:id/addProject', employees.addProject)
    .get('/:id/promoteManager', employees.promoteToManager)
    .put('/:id/addManagedProject', employees.addManagedProject)

module.exports = router;
