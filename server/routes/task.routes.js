const express = require('express');
const router = express.Router();
const tasks = require('../controllers/task.controller');

router
  .get('/', tasks.index)
  .get('/:id', tasks.show)
  .post('/', tasks.create)
  .put('/:id', tasks.update)
  .delete('/:id', tasks.destroy)
  .put('/addNote/:id', tasks.addNote)
  .put('/:id/addTeamMember', tasks.addTeamMember)
  .put('/:id/removeTeamMember', tasks.removeTeamMember)
  .get('/getEmployeeTasks/:id', tasks.getEmployeeTasks)
  .put('/removeMemberFromMultiple', (req,res) => {
    console.log('hello world you asshole');
    console.log(req.body);
  })
  //.put('/removeMemberFromMultiple', tasks.removeTeamMemberFromMultiple)

module.exports = router;
