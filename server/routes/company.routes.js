const express = require('express');
const router = express.Router();
const companies = require('../controllers/companies');

router.get('/', companies.index)
    .get('/:id', companies.show)
    .post('/', companies.create)
    .put('/:id', companies.update)
    .delete('/:id', companies.destroy)

module.exports = router;
