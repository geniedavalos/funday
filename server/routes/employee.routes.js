const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees');

router.get('/', employees.index)
    .get('/:id', employees.show)
    .post('/', employees.create)
    .put('/:id', employees.update)
    .delete('/:id', employees.destroy)
    
module.exports = router;
