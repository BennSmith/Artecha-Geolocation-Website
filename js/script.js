/* IMS ART WEBSITE
 *
 * 2019 Ben Smith
 *
 *
 */

// ================================================================================
// Firebase Config

var config = {
    apiKey: "AIzaSyDOk7L0dLkzPO9URTPw8-Wlr4-X-5LWVyg",
    authDomain: "imsapp-c8d25.firebaseapp.com",
    databaseURL: "https://imsapp-c8d25.firebaseio.com",
    projectId: "imsapp-c8d25",
    storageBucket: "imsapp-c8d25.appspot.com",
    messagingSenderId: "537190783368"
};
firebase.initializeApp(config);

// ================================================================================
// Image Location

var img = document.createElement('img');
img.src = "img/ARTECHA_painting_FINAL.png";

// ================================================================================
// Global Variables

var leftBound = -84.7395;
var rightBound = -84.7305;
var upperBound = 39.5105;
var lowerBound = 39.5050;

// Brush Settings
var brushSize = 20;

// ================================================================================
// Create Canvas

//var $canvas = $('#canvas');
//var ctx = $canvas[0].getContext('2d');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = Math.abs(rightBound - leftBound);
var height = Math.abs(upperBound - lowerBound);

//var realwidth = parseInt($canvas.css('width'));
//var realheight = parseInt($canvas.css('height'));

var realwidth = canvas.width;
var realheight = canvas.height;

var canvasImgScale;
var canvasImgX;
var canvasImgY;
img.onload = function() {
    canvasImgScale = Math.max(canvas.width / img.width, canvas.height / img.height);
    canvasImgX = (canvas.width / 2) - (img.width / 2) * canvasImgScale;
    canvasImgY = (canvas.height / 2) - (img.height / 2) * canvasImgScale;
}

//console.log(realwidth);
//var realheight = (realwidth * height / width).toString();

/*
$canvas.css({
    width: realwidth + 'px',
    height: realheight + 'px'
});
*/

// ================================================================================
// Populate Canvas

var locations = [];
var locationsdb = firebase.database().ref('locations').orderByChild("timestamp");


locationsdb.on('value', function(snapshot) {
    var location = snapshot.val();
    var data = {
        lat: location.latitude,
        long: location.longitude,
        time: location.timestamp
    };
    //console.log(data);

    mapCoords(parseFloat(data.lat), parseFloat(data.long));
});

locationsdb.on('child_added', function(snapshot) {
    var location = snapshot.val();
    var data = {
        lat: location.latitude,
        long: location.longitude,
        time: location.timestamp
    };
    //console.log(data);

    mapCoords(parseFloat(data.lat), parseFloat(data.long));
});

function mapCoords(lat, long) {
    //console.log("lat: " + lat + ", long: " + long);
    if (
        lat > lowerBound && lat < upperBound &&
        long > leftBound && long < rightBound
    ) {
        var x = (((long - leftBound) / (rightBound - leftBound)) * realwidth);
        var y = realheight - (((lat - lowerBound) / (upperBound - lowerBound)) * realheight);

        drawCircle(Math.floor(x), Math.floor(y));
        //console.log("x: " + lat + ", y: " + long);
    } else {
        //console.log("out of bounds");
    }
}

// Draw Circle

// x    - x coordinate
// y    - y coordinate
// ctx  - canvas context
function drawCircle(x, y) {
    //console.log("drawing: " + x + ", " + y)
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, canvasImgX, canvasImgY, img.width * canvasImgScale, img.height * canvasImgScale);
    ctx.restore();
}