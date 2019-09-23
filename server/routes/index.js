const express = require('express');
const router = express.Router();
const catchallRoute = require('./catchall.routes');
const apiRouter = express.Router();
const employeeRoutes = require('./employee.routes');
const projectRoutes = require('./project.routes');
apiRouter.use('/employees', employeeRoutes)
  .use('/projects', projectRoutes);
router.use('/api', apiRouter)
  .use(catchallRoute);
module.exports = router;
