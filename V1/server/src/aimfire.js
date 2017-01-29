//setting up canvas
var canvas = document.getElementById("AmazingCanvas");
var context = canvas.getContext("2d");
//Hardcoded bcoz we´re out of time!
context.font = "30px Arial";

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 220;

//Set initial values for pen size, circle radius, drawing mode and a bool flag needed for free-hand drawing
var penSize = 5;	//this is actually the radius of a point, but nevermind that.
var draw = false;
var circleRadius = 40;
var recHeight = 40;
var recWidth = 40;
var currentFunc = startDrawing;
var text = "Hello, world!"
var settingNames = new Array("pensize", "circleradius", "rectangleheight", "rectanglewidth");


context.lineWidth = penSize * 2;
//Create Arrays used as stacks of actions taken on canvas. Popping one off undo and into redo
//and redrawing will redraw everything in undo, which now does not include the latest object on the canvas.
var undo = new Array();
var redo = new Array();
//Initializing settings for redrawing purposes
undo.push(new Array("pensize", penSize));
undo.push(new Array("circleradius", circleRadius));
undo.push(new Array("rectanglewidth", recWidth));
undo.push(new Array("rectangleheight", recHeight));

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
			case "rectangle":
				redrawRectangle(object);
				break;
			case "rectangleheight":
				setRectangleHeight(object[1],1);
				break;
			case "rectanglewidth":
				setRectangleWidth(object[1],1);
				break;
			case "text":
				redrawText(object);
		}
	}
	setPenSize(tempPenSize, 1);							//Restore global settings
	setCircleRadius(tempCircleRadius, 1);
}

//Making a redraw makes me want to refactor the original draw :/
function redrawCircle(circle) {
	context.beginPath();
	context.arc(circle[1], circle[2], circleRadius, 0, 2*Math.PI);
	context.stroke();
	context.beginPath();
}
function redrawRectangle(rectangle) {
	context.beginPath();
	context.rect(rectangle[1], rectangle[2], recWidth, recHeight);
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

//redraws text
function redrawText(Text) {
	context.fillText(Text[1],Text[2],Text[3]);
}

//Undo function, by popping from undo and into redo, I remove one object to be redrawn and also store that object
//For some reason, undo and redo seem to be invalid functionnames. Probably because they are also variablenames
function undo1() {
	if(undo.length > 0) {
		var popp = undo.pop();
		if(settingNames.includes(popp[0])) {
			undo1();
		}
		redo.push(popp);
		redraw();
	}
}

function redo1() {
	if(redo.length > 0) {
		var popp = redo.pop();
		if(settingNames.includes(popp[0])) {
			redo1();
		}
		undo.push(popp);
		redraw();
	}
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
function setRectangleWidth(newRecWidth, redrawing) {
	if(newRecWidth > 0) {
		recWidth = newRecWidth;
	}
	if(!redrawing){
		undo.push(new Array("rectanglewidth", recWidth));
	}
}
function setRectangleHeight(newrecHeight, redrawing) {
	if(newrecHeight > 0) {
		recHeight = newrecHeight;
	}
	if(!redrawing){
		undo.push(new Array("rectangleheight", recHeight));
	}
}
function setText(newText) {
	text = newText;
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

//draws a rectangle
function drawRectangle(e) {
	context.beginPath();
	context.rect(e.clientX, e.clientY, recWidth, recHeight);
	undo.push(new Array("rectangle", e.clientX, e.clientY,recWidth,recHeight));
	context.stroke();
	context.beginPath();
}

//draws text
function drawText(e) {
	context.fillText(text,e.clientX,e.clientY);
	undo.push(new Array("text", text, e.clientX, e.clientY))
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
//switches into rectangle drawing mode
function setFuncRectangle() {
	canvas.removeEventListener("mousedown", currentFunc);
	currentFunc = drawRectangle;
	canvas.addEventListener("mousedown", currentFunc);
}
//switches into text drawing mode
function setFuncText() {
	canvas.removeEventListener("mousedown", currentFunc);
	currentFunc = drawText;
	canvas.addEventListener("mousedown", currentFunc);
}
//sets event listeners, initializing drawing mode. The first is not permanent
canvas.addEventListener("mousedown", currentFunc);
var currentUp = stopDrawing;
canvas.addEventListener("mouseup", currentUp);
var currentMove = mouseDraw;
canvas.addEventListener("mousemove", currentMove)
