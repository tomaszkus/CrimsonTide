"use strict";

var dataProvider = require('./dataProvider');

var X_SIZE = 60;
var Y_SIZE = 60;

function prepareMap() {
    var array = new Array(X_SIZE);

    for (var i = 0; i < X_SIZE; i++) {
        array[i] = new Array(Y_SIZE);
    }
    for (i = 0; i< X_SIZE; i++) {
        for (var j = 0; j<Y_SIZE; j++) {
            array[i][j] = 0;
        }
    }

    function updateFor(list, value) {
        list.forEach(function (item) {
            array[item.x][item.y] = value;
        });
    }
    updateFor(dataProvider.provideWater().water,-5);
    updateFor(dataProvider.provideKeyPoints().keyPoints,70);
    updateFor(dataProvider.provideOfficers().officers,15);
    updateFor(dataProvider.provideRadiation().radiation,-15);
    updateFor(dataProvider.provideWeapons().weapons,10);
    updateFor(dataProvider.provideSoldiers().soldiers,5);

    return array;
}

var values = prepareMap();

exports.calculateFor = function(x,y) {
    return values[x][y];
};

