const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees');

router.get('/', employees.all)
    .get('/:id', employees.getOneById)
    .post('/', employees.create)
    .put('/:id', employees.update)
    .delete('/:id', employees.delete)

module.exports = router;
