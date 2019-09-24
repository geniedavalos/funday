const express = require('express');
const router = express.Router();
const catchallRoute = require('./catchall.routes');
const apiRouter = express.Router();
const employeeRoutes = require('./employee.routes');
const projectRoutes = require('./project.routes');
const taskRoutes = require('./task.routes');
const authRoutes = require('./auth.routes');
apiRouter.use('/employees', employeeRoutes)
  .use('/projects', projectRoutes)
  //.use('/tasks', taskRoutes);
router.use('/api', apiRouter)
  .use(authRoutes)
  .use(catchallRoute);
module.exports = router;
