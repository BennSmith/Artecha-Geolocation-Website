// Global Variables
var config = {
    apiKey: "AIzaSyDOk7L0dLkzPO9URTPw8-Wlr4-X-5LWVyg",
    authDomain: "imsapp-c8d25.firebaseapp.com",
    databaseURL: "https://imsapp-c8d25.firebaseio.com",
    projectId: "imsapp-c8d25",
    storageBucket: "imsapp-c8d25.appspot.com",
    messagingSenderId: "537190783368"
};

var leftBound = -84.7395;
var rightBound = -84.7305;
var upperBound = 39.5105;
var lowerBound = 39.5073;

// DB Variabls
var locationsdb;
var locations;

// Canvas
var canvas;
var width;
var height;

// "Background" Image
var imgsrc = "";

// Mask Colour
var mask = 'white';

// "Brush" Settings
var brushSize = 0.1;

function setup() {
    // setup connection to the database
    firebase.initializeApp(config);

    // setup the canvas
    var width = abs(rightBound - leftBound);
    var height = abs(upperBound - lowerBound);

    var realwidth = 500;
    var realheight = (realwidth * height / width);

    canvas = createCanvas(realwidth, realheight);
    canvas.parent('artboard');
    background('lightgrey');

}

function draw() {

}