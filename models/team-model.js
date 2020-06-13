var mongoose = require('mongoose');
var Schema =  require('mongoose').Schema;
var Course = require('./team-model');
var TeamSchema = new Schema({
    title: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Team', TeamSchema);
