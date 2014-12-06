'use strict';

var express = require('express');
var mongoose = require('mongoose');

var dataProvider = require('./dataProvider');
var valueCalculator = require('./valueCalculator');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
var secret = 'topSecret';

var Results = mongoose.model('Result',{
    team: String,
    x: Number,
    y: Number,
    value: Number
});


mongoose.connect('mongodb://@localhost:27017/tide', function (error) {
if (error) {
    console.log(error);
}
});

app.get('/officers/:result', function(req, res) {
    if(req.params.result !== secret){
        res.status(404).send({message: 'Not so easy.'});
    }else{
        res.status(200).send({message: JSON.stringify(dataProvider.provideOfficers())});
    }
});

app.get('/keyPoints/:result', function(req, res) {
    if(req.params.result !== secret){
        res.status(404).send({message: 'Not so easy.'});
    }else{
        res.status(200).send({message: JSON.stringify(dataProvider.provideKeyPoints())});
    }
});

app.get('/water/:result', function(req, res) {
    if(req.params.result !== secret){
        res.status(404).send({message: 'Not so easy.'});
    }else{
        res.status(200).send({message: JSON.stringify(dataProvider.provideWater())});
    }
});

app.get('/radiation/:result', function(req, res) {
    if(req.params.result !== secret){
        res.status(404).send({message: 'Not so easy.'});
    }else{
        res.status(200).send({message: JSON.stringify(dataProvider.provideRadiation())});
    }
});

app.get('/soldiers/:result', function(req, res) {
    if(req.params.result !== secret){
        res.status(404).send({message: 'Not so easy.'});
    }else{
        res.status(200).send({message: JSON.stringify(dataProvider.provideSoldiers())});
    }
});

app.get('/weapons/:result', function(req, res) {
    if(req.params.result !== secret){
        res.status(404).send({message: 'Not so easy.'});
    }else{
        res.status(200).send({message: JSON.stringify(dataProvider.provideWeapons())});
    }
});

app.post('/results', function(req, res) {
    var x = req.body.x;
    var y = req.body.y;
    var value = valueCalculator.calculateFor(req.body.x, req.body.y);

    Results.find({x: req.body.x, y: req.body.y}).exec(function(err, found){
        if (found.length === 0) {
            Results.find({team: req.body.team}).exec(function(err, found) {
                if (found.length < 10) {
                    var results = new Results({
                        team: req.body.team,
                        x: req.body.x,
                        y: req.body.y,
                        value: value
                    });
                    results.save(function (err) {
                        if (err) res.send(500);
                        else {
                            res.status(200).send('Value gained: ' + value);
                        }
                    });
                } else {
                    res.status(412).send('Too many calls from your team. Only 10 is allowed.');
                }
            });
        } else {
            res.status(412).send('Already taken :(');
        }
    });

});

app.listen(3000);