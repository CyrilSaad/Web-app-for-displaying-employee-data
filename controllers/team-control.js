const mongoose = require('mongoose');
const Team = require('../models/team-model');

exports.addTeam = (req, res) => {
    let item = new Team({
        title: req.body.title
    });
    item.save();
    res.send("Team has been created!");
};

exports.getTeams = (req, res) => {
    Team.find().then(teams => {
        res.send(teams);
    })
};
    exports.changeTeam = (req, res) => {
        let title = req.params.title;
        let id = mongoose.Types.ObjectId(req.body.id);
        Team.update({_id: id}, {"title": title}, (err, data) => {
            if(err) console.log("An error has occured...", err);
            res.send("Title changed.");
        });
    };

    exports.deleteTeam = (req, res) => {
        let id = mongoose.Types.ObjectId(req.body.id);
        Team.findOneAndRemove({_id:id}, err => {
            if (err) throw(err);
            res.send("Team has been removed.")
        })
    }
