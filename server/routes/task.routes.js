const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks');

router.get('/', tasks.all)
  .get('/:id', tasks.getOneById)
  .post('/', tasks.create)
  .put('/:id', tasks.update)
  .delete('/:id', tasks.delete)

module.exports = router;
