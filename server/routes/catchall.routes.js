const express = require('express');
const path = require('path');
const router = express.Router();

router.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
});

module.exports = router;
