var express = require('express');
var router = express.Router();
var control = require('../controllers/employee-control');
const employeeValidator = require('../models/employee-validations');
const validate = require('express-validation');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Employee', validate(employeeValidator.addEmployee), (req, res) => {
  control.addEmployee(req, res);
});

router.put('/Employee/:seniorityLevel', validate(employeeValidator.updateEmployee) ,(req, res) => {
  control.updateEmployee(req, res)
});

router.get('/Employees', function(req, res, next) {
 control.findEmployees(req, res)
});

router.get('/EmployeesByLevel', (req, res) => {
    control.findEmployeesByLevel(req, res)
});

router.delete('/Employee', validate(employeeValidator.deleteEmployee) ,(req, res) => {
  control.deleteEmployee(req, res)
});
router.get('/EmployeesByDate', (req, res) => {
    control.findEmployeesByDate(req, res)
});
router.get('/EmployeesByTeam', (req, res) => {
    control.getEmployeesbyTeam(req, res)
});
module.exports = router;
