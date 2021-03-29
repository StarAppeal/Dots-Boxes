var express = require('express');
var router = express.Router();
var models = require('../../models');
var gameMap: Map<String, Game>;

/* GET users listing. */
router.post('/createField', function(req, res, next) {
  let metadata: UserMetadata = req.body;
  console.log("metadata:" + JSON.stringify(metadata));
  models.User.findAll().then(users => {
    res.status(200).send(users[0]);
  })
});

router.get('/createField', function(req, res, next) {
  let metadata: UserMetadata = req.body;
  console.log("metadata:" + JSON.stringify(metadata));
  models.User.findAll().then(users => {
    res.status(200).send(users[0]);
  })
});

router.get("/", function(req, res, next) {
  models.Test.findAll().then(tests => {
    res.status(200).send(tests);
  });
});

module.exports = router;
