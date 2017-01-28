//setting up canvas
var canvas = document.getElementById("AmazingCanvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 150;

//Setting initial values
var penSize = 5;
var draw = false;
var circleRadius = 40;
var currentFunc = startDrawing;
context.lineWidth = penSize * 2;

//set radius of circles drawn by drawCircle(e)
function setCircleRadius() {
	newRadius = parseInt(document.getElementById("circleradius").value)
	if(newRadius > 0) {
		circleRadius = newRadius;
	}
}

//set pen size
function setPenSize() {
	newSize = parseInt(document.getElementById("pensize").value)
	if(newSize > 0) {
		penSize = newSize;
		context.lineWidth = penSize*2;
	}
}

//the following three handle free-hand drawing
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

function drawCircle(e) {
	context.beginPath();
	context.arc(e.clientX, e.clientY, circleRadius, 0, 2*Math.PI);
	context.stroke();
	context.beginPath();
}

function setFuncDrawing() {
	currentFunc = startDrawing;
}

function setFuncCircle() {
	currentFunc = drawCircle;
}

canvas.addEventListener("mousedown", currentFunc);
var currentUp = stopDrawing;
canvas.addEventListener("mouseup", currentUp);
var currentMove = mouseDraw;
canvas.addEventListener("mousemove", currentMove)




/*
<form id="circle">
		Circle
		X = <input type="number" id="circlex">
		Y = <input type="number" id="circley">
		Radius = <input type="number" id="circleradius">
		<button onmousedown="drawCircle()">Draw!</button>
	</form>
*/