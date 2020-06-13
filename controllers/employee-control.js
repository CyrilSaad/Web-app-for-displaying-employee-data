const mongoose = require('mongoose');
const Employee = require('../models/employee-model');

exports.addEmployee = (req, res) => {
  let item = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      employmentDate: req.body.employmentDate,
      seniorityLevel: req.body.seniorityLevel,
      team: req.body.team
  });
  item.save();
  res.send('Employee added!');
   console.log(res.body);
};

exports.deleteEmployee = (req, res) => {
 let userId = mongoose.Types.ObjectId(req.body.id);
 Employee.findOneAndRemove({_id: userId}, err => {
     if (err) console.log(err)
 });
 res.send('Employee has been removed.');
};

exports.findEmployees = (req, res) => {
    let {page} = req.query;
    console.log(req.query);
    Employee.aggregate([
        {
            $lookup: {
                from: 'teams',
                localField: 'team',
                foreignField: '_id',
                as: 'employeeTeams'
            }
        },
        {
            $unwind: '$employeeTeams'

        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                employmentDate: 1,
                seniorityLevel: 1,
                team: '$employeeTeams.title'
            }
        }


    ]).then(employees => {
            res.send(employees);
            console.log(employees)
        }
    )
};

exports.updateEmployee =  (req, res) => {

    let id = mongoose.Types.ObjectId(req.body.id);
    let newData = req.params.seniorityLevel;
    let team = mongoose.Types.ObjectId(req.body.team);
         Employee.update({_id: id}, {"seniorityLevel": newData}, (err, data) => {
            if(err) console.log("An error has occured...", err);
         });
             Employee.update({_id: id}, {"team": team}, (err, data) => {
                 if(err) console.log("An error has occured...", err);
                 res.send("Employee has been assigned to a new team.")
             });



    };

exports.findEmployeesByLevel = (req, res) => {
    Employee.find({}).sort("seniorityLevel").then(employees => res.send(employees));
};

exports.findEmployeesByDate = (req, res) => {
            let {page} = req.query;
            console.log(req.query);
    Employee.aggregate([
        {
            $lookup: {
                from: 'teams',
                localField: 'team',
                foreignField: '_id',
                as: 'employeeTeams'
            }
        },
        {
            $unwind: '$employeeTeams'

        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                employmentDate: 1,
                seniorityLevel: 1,
                team: '$employeeTeams.title'
            }
        }


    ]).sort({"employmentDate": -1}).limit(parseInt(page)).then(employees => {
        res.send(employees);
        console.log(employees)
    }
    )

};
// };
exports.getEmployeesbyTeam = (req, res) => {
    Employee.aggregate([
        {
            $lookup: {
                from: 'teams',
                localField: 'team',
                foreignField: '_id',
                as: 'employeeTeams'
            }
        },
        {
            $unwind: '$employeeTeams'

        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                team: '$employeeTeams.title'
            }
        },
        {
            $group: {
                _id: '$team',
                employees:  {$push: '$$ROOT'}
            }
        }

    ]).then(teams => {
        res.send(teams);
    })
};
