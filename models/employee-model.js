
var mongoose = require('mongoose');
var Schema =  require('mongoose').Schema;
var Team = require('./team-model');
var EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Intermediate', 'Senior'],
    },
    employmentDate: Date,
    team:{
      type: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Employee', EmployeeSchema);
