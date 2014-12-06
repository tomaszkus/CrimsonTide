"use strict";

var async = require('async');
var gm = require('gm');
var fs = require('fs');
var request = require('request');
var util = require('util');
var mongoose = require('mongoose');

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

var teams = [
    {code: "secret", name: "example"}
];

function drawRectangleOn(map, x, y, color) {
    map.fill(color);
    return map.drawRectangle(10 * x, 10 * y, (x + 1) * 10, (y + 1) * 10);
}
function retrieveLocations(map, item, key, color, done) {
    request(util.format('http://localhost:3000/%s/%s', item, key), function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var locations = JSON.parse(JSON.parse(body).message)[item];
            locations.forEach(function(location) {
                drawRectangleOn(map, location.x, location.y, color);
            });
            done();
        } else {
            done(err);
        }
    });
}
function drawCircleOn(map, x, y, color) {
    map.fill(color);
    return map.drawCircle(10 * x + 5, 10 * y + 5, x * 10 + 8, y * 10 + 8);
}
function markCapturedPoints(map, team, done) {
    Results.find({team: team.code}).exec(function(err, found){
        var total  = 0;
        found.forEach(function(item) {
            total += item.value;
            drawCircleOn(map, item.x, item.y, "black");
        });
        console.log('team: ' + team.name + ' achieved result: ' + total);
        done();
    });
}
function write(map, filename, done) {
    map.write(filename, function (err) {
        if (!err) {
            console.log('done for ' + filename);
        }
        else {
            console.log(err);
        }
        done(err);
    });
}
function draw(team, done) {
    var map = gm('./map.png');
    async.series([
        async.apply(retrieveLocations, map, "officers", "topSecret", "orange"),
        async.apply(retrieveLocations, map, "keyPoints", "topSecret", "red"),
        async.apply(retrieveLocations, map, "water", "topSecret", "steelblue"),
        async.apply(retrieveLocations, map, "radiation", "topSecret", "pink"),
        async.apply(retrieveLocations, map, "weapons", "topSecret", "violet"),
        async.apply(retrieveLocations, map, "soldiers", "topSecret", "lightGreen"),
        async.apply(markCapturedPoints, map, team),
        async.apply(write, map, './' + team.name + '.png')
    ], done());
}
function drawAll(done) {
    async.eachSeries(teams, draw, function(err) {
        if (err) {
            console.log(err);
        }
    });
}
drawAll();