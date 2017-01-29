//setting up canvas
var canvas = document.getElementById("AmazingCanvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 110;

//Set initial values for pen size, circle radius, drawing mode and a bool flag needed for free-hand drawing
var penSize = 5; //this is actually the radius of a point, but nevermind that.
var draw = false;
var circleRadius = 40;
var currentFunc = startDrawing;

var cSwitches = document.getElementByClassname('cSwitch');
for(var i = 0, j = cSwitches.length; i < j; i++){
	cSwitches[i].addEventListener('click', colourSwitch);
}

context.lineWidth = penSize * 2;

var undo = new Array();
var redo = new Array();

function setColour(colour){
	context.fillStyle = colour;
	context.strokeStyle = colour;
	var active = getElementByClassname('activ')[0];
	if(activ){
		activ.className = 'cSwitch';
	}
}
function colourSwitch(e){
	var cSwitch = e.target
	setColour(cSwitch.style.backgroundColor);
	cSwitch.className += ' activ';
}

//Redraws everything in the undo array
//Each element in undo is one object and the first property of each object is its type
function redraw() {
	context.clearRect(0,0,canvas.width, canvas.height);
	for(var i = 0; i < undo.length(); i++) {
		var object = undo[i];
		var type = object[0];
		switch(type) {
			case "drawing":
				redrawDrawing(object);
				break;
			case "circle":
				redrawCircle(object);
				break;
		}
	}
}

//set radius of circles drawn by drawCircle(e)
function setCircleRadius() {
	newRadius = parseInt(document.getElementById("circleradius").value);
	if(newRadius > 0) {
		circleRadius = newRadius;
	}
}

//set pen size
function setPenSize() {
	newSize = parseInt(document.getElementById("pensize").value);
	if(newSize > 0) {
		penSize = newSize;
		context.lineWidth = penSize*2;
	}
}

//the following three functions handle free-hand drawing
function startDrawing(e) {
	context.moveTo(e.clientX, e.clientY);
	draw = true;
	mouseDraw(e);
}

function stopDrawing(e) {
	draw = false
	context.beginPath();
}

function mouseDraw(e) {
	if(draw){
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.arc(e.clientX, e.clientY, penSize, 0, 2*Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX,e.clientY);
	}
}

//draws a circle
function drawCircle(e) {
	context.beginPath();
	context.arc(e.clientX, e.clientY, circleRadius, 0, 2*Math.PI);
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
