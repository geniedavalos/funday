const express = require('express');
const router = express.Router();
const companies = require('../controllers/company.controller');

router.get('/', companies.index)
    .get('/:id', companies.show)
    .post('/', companies.create)
    .put('/:id', companies.update)
    .delete('/:id', companies.destroy)
    .put('/:id/addEmployee', companies.addEmployee)
    .put('/:id/addProject', companies.addProject)
    .put('/:id/addDepartment', companies.addDepartment);

module.exports = router;
