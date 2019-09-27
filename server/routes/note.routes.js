const express = require('express');
const router = express.Router();
const notes = require('../controllers/note.controller');

router
  .get('/', notes.index)
  .get('/:id', notes.show)
  .post('/', notes.create)
  .put('/:id', notes.update)
  .delete('/:id', notes.destroy)
module.exports = router;
