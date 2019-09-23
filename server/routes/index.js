const express = require('express');
const router = express.Router();
const catchallRoute = require('./catchall.routes');
const apiRouter = express.Router();
const petRoutes = require('./employee.routes');
apiRouter.use('/pets', petRoutes);
router.use('/api', apiRouter)
  .use(catchallRoute);
module.exports = router;
