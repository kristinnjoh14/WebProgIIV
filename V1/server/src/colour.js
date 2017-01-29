

var cSwitch1 = document.getElementsByClassName("cSwitch");
for(var i = 0, j = cSwitch1.length; i < j; i++){
  cSwitch1[i].addEventListener('click', colourSwitch,true);
}
function setColour(colour){
	context.fillStyle = colour;
	context.strokeStyle = colour;
	var active = document.getElementsByClassName("active");
	if(active){
		active.className = 'cSwitch';
	}
}
function colourSwitch(e){
	var button = e.target
	setColour(button.style.backgroundColor);
	button.className += ' active';
}
