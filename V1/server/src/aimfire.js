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

var cSwitches = document.getElementByClassname('cSwitch');
for(var i = 0, j = cSwitches.length; i < j; i++){
	cSwitches[i].addEventListener('click', colourSwitch);
}

context.lineWidth = penSize * 2;
//Create Arrays used as stacks of actions taken on canvas. Popping one off undo and into redo
//and redrawing will redraw everything in undo, which now does not include the latest object on the canvas.
var undo = new Array();
var redo = new Array();
//Initializing settings for redrawing purposes
undo.push({"pensize", penSize});
undo.push({"circleradius", circleRadius});


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
	context.clearRect(0,0,canvas.width, canvas.height); //Clear the canvas
	var tempCircleRadius = circleRadius;				//Store global settings
	var tempPenSize = penSize;
	for(var i = 0; i < undo.length(); i++) {			//Loop through each object stored in undo
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
				setPenSize(object[1]);
				break;
			case "circleradius":
				setCircleRadius(object[1]);
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
	for(var i = 0; i < drawing.length(); i++) {

	}
}

//set radius of circles drawn by drawCircle(e)
function setCircleRadius(newRadius) {
	if(newRadius > 0) {
		circleRadius = newRadius;
	}
}

//set pen size
function setPenSize(newSize) {
	if(newSize > 0) {
		penSize = newSize;
		context.lineWidth = penSize*2;
	}
}

var lastDrawing = {};
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
	undo.push({"circle", e.clientX, e.clientY, circleRadius});
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
