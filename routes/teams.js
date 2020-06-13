var express = require('express');
var router = express.Router();
let control = require('../controllers/team-control');
/* GET users listing. */
router.post('/Team', (req, res) => {
 control.addTeam(req, res);
});
router.get('/Teams', (req, res) => {
  control.getTeams(req, res)
});
router.put('/Team/:title', (req, res) => {
  control.changeTeam(req, res)
});
router.delete('/Team', (req, res) => {
  control.deleteTeam(req, res)
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
