const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    payload: "Welcome to Sealab 2021. Read the Docs before starting. Please don't blow the place up.",
    err: false
  })
});

module.exports = router;