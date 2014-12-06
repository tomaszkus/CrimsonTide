"use strict";

exports.provideKeyPoints = function provideKeyPoints() {
    return {
        keyPoints: [
            {x: 24, y: 44},
            {x: 19, y: 18},
            {x: 18, y: 4}
        ]
    };
};

exports.provideWater = function provideWater() {
    var array = [];
    for (var x = 0; x <= 59; x++) {
        for (var y = 0; y <= 59; y++) {
            if (x + y > 90) {
              array.push({x: x, y: y});
            }
        }
    }
    return {
        water: array
    };
};

exports.provideOfficers = function provideOfficers() {
    return {
        officers: [
            {x: 0, y: 12},
            {x: 1, y: 16},
            {x: 1, y: 49},
            {x: 2, y: 31},
            {x: 3, y: 48},
            {x: 5, y: 33},
            {x: 8, y: 19},
            {x: 13, y: 24},
            {x: 21, y: 6},
            {x: 34, y: 6},
            {x: 55, y: 16}
        ]
    };
};

function baseRadiation() {
    var points = [
        {x: 0, y: 0},
        {x: 0, y: 5},
        {x: 0, y: 6},
        {x: 0, y: 7},
        {x: 0, y: 9},
        {x: 1, y: 0},
        {x: 1, y: 3},
        {x: 1, y: 5},
        {x: 1, y: 8},
        {x: 2, y: 0},
        {x: 2, y: 1},
        {x: 2, y: 4},
        {x: 2, y: 6},
        {x: 2, y: 7},
        {x: 2, y: 8},
        {x: 3, y: 0},
        {x: 3, y: 2},
        {x: 3, y: 3},
        {x: 3, y: 6},
        {x: 3, y: 9},
        {x: 4, y: 2},
        {x: 4, y: 8},
        {x: 5, y: 0},
        {x: 5, y: 1},
        {x: 5, y: 2},
        {x: 5, y: 6},
        {x: 5, y: 8},
        {x: 6, y: 0},
        {x: 6, y: 0},
        {x: 6, y: 1},
        {x: 6, y: 4},
        {x: 6, y: 6},
        {x: 6, y: 8},
        {x: 7, y: 6},
        {x: 7, y: 8},
        {x: 7, y: 9},
        {x: 8, y: 1},
        {x: 8, y: 2},
        {x: 8, y: 5},
        {x: 8, y: 7},
        {x: 9, y: 1},
        {x: 9, y: 2},
        {x: 9, y: 3},
        {x: 9, y: 4},
        {x: 9, y: 5},
        {x: 9, y: 7}
    ];
    return points;
}

exports.provideRadiation = function provideRadiation() {
    var table = [];
    baseRadiation().forEach(function(point) {
        table.push({x: point.x + 28, y: point.y + 15});
    });
    baseRadiation().forEach(function(point) {
        table.push({x: point.x + 38, y: point.y + 15});
    });
    baseRadiation().forEach(function(point) {
        table.push({x: point.x + 38, y: point.y + 25});
    });
    baseRadiation().forEach(function(point) {
        table.push({x: point.x + 28, y: point.y + 25});
    });


    return {
        radiation: table
    };
};

exports.provideWeapons = function provideWeapons() {

    return {
        weapons: [
            {x:32, y: 20},
            {x:42, y: 20},
            {x:32, y: 30},
            {x:42, y: 30},
            {x:25, y: 30},
            {x:2, y: 58},
            {x:6, y: 58},
            {x:8, y: 58},
            {x:20, y: 58}
        ]
    };
};

exports.provideSoldiers = function provideSoldiers() {

    return {
        soldiers: [
            {x:10, y: 10},
            {x:12, y: 0},
            {x:25, y: 30},
            {x:15, y: 35},
            {x:16, y: 45},
            {x: 2, y: 40},
            {x: 8, y: 40},
            {x: 16, y: 40},
            {x: 24, y: 35},
            {x: 40, y: 1},
            {x: 50, y: 2},
            {x: 40, y: 42},
            {x: 42, y: 40}
        ]
    };
};
