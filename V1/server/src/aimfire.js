//setting up canvas
var canvas = document.getElementById("AmazingCanvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 110;

//Set initial values for pen size, circle radius, drawing mode and a bool flag needed for free-hand drawing
var penSize = 5;	//this is actually the radius of a point, but nevermind that.
var draw = false;
var circleRadius = 40;
var currentFunc = startDrawing;
context.lineWidth = penSize * 2;
//Create Arrays used as stacks of actions taken on canvas. Popping one off undo and into redo
//and redrawing will redraw everything in undo, which now does not include the latest object on the canvas.
var undo = new Array();
var redo = new Array();
//Initializing settings for redrawing purposes
undo.push(new Array("pensize", penSize));
undo.push(new Array("circleradius", circleRadius));


//Redraws everything in the undo array
//Each element in undo is one object and the first property of each object is its type
function redraw() {
	context.clearRect(0,0,canvas.width, canvas.height); //Clear the canvas
	var tempCircleRadius = circleRadius;				//Store global settings
	var tempPenSize = penSize;
	for(var i = 0; i < undo.length; i++) {			//Loop through each object stored in undo
		var object = undo[i];							//They can be objects drawn to the canvas or changes to settings
		var type = object[0];							//Redraw them to the canvas and reapply all settings 
		switch(type) {									//as they were when originally drawn
			case "drawing":
				redrawDrawing(object);
				break;
			case "circle":
				redrawCircle(object);
				break;
			case "pensize":
				setPenSize(object[1], 1);
				break;
			case "circleradius":
				setCircleRadius(object[1], 1);
				break;
		}
	}
	setPenSize(tempPenSize);							//Restore global settings
	setCircleRadius(tempCircleRadius);
}

//Making a redraw makes me want to refactor the original draw :/
function redrawCircle(circle) {	
	context.beginPath();
	context.arc(circle[1], circle[2], circleRadius, 0, 2*Math.PI);
	context.stroke();
	context.beginPath();
}

//This one is better off redone, though.
function redrawDrawing(drawing) {
	var arr = drawing[1];
	context.moveTo(arr[0][0], arr[0][1]);
	for(var i = 0; i < arr.length; i++) {
		var x = arr[i][0];
		var y = arr[i][1];
		context.lineTo(x, y);
		context.stroke();
		context.arc(x, y, penSize, 0, 2*Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(x, y);
	}
	context.beginPath();
}

//set radius of circles drawn by drawCircle(e)
function setCircleRadius(newRadius, redrawing) {
	if(newRadius > 0) {
		circleRadius = newRadius;
	}
	if(!redrawing){
		undo.push(new Array("circleradius", circleRadius));
	}
}

//set pen size
function setPenSize(newSize, redrawing) {
	if(newSize > 0) {
		penSize = newSize;
		context.lineWidth = penSize*2;
	}
	if(!redrawing) {
		undo.push(new Array("pensize", penSize));
	}
}

//Stores each drawing as it is made and is pushed in its entirety into undo
var lastDrawing = new Array();
//the following three functions handle free-hand drawing
function startDrawing(e) {
	context.moveTo(e.clientX, e.clientY);
	lastDrawing.push(new Array(e.clientX, e.clientY));
	draw = true;
	mouseDraw(e);
}

function stopDrawing(e) {
	if(draw) {
		context.beginPath();
		undo.push(new Array("drawing", lastDrawing))
		lastDrawing = new Array();
		draw = false
	}
}

function mouseDraw(e) {
	if(draw){
		context.lineTo(e.clientX, e.clientY);
		lastDrawing.push(new Array(e.clientX, e.clientY));
		context.stroke();
		context.arc(e.clientX, e.clientY, penSize, 0, 2*Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	}
}

//draws a circle
function drawCircle(e) {
	context.beginPath();
	context.arc(e.clientX, e.clientY, circleRadius, 0, 2*Math.PI);
	undo.push(new Array("circle", e.clientX, e.clientY, circleRadius));
	context.stroke();
	context.beginPath();
}

//switches into free-hand drawing mode
function setFuncDrawing() {
	canvas.removeEventListener("mousedown", currentFunc);
	currentFunc = startDrawing;
	canvas.addEventListener("mousedown", currentFunc);
}

//switches into circle drawing mode
function setFuncCircle() {
	canvas.removeEventListener("mousedown", currentFunc);
	currentFunc = drawCircle;
	canvas.addEventListener("mousedown", currentFunc);
}

//sets event listeners, initializing drawing mode. The first is not permanent
canvas.addEventListener("mousedown", currentFunc);
var currentUp = stopDrawing;
canvas.addEventListener("mouseup", currentUp);
var currentMove = mouseDraw;
canvas.addEventListener("mousemove", currentMove)

