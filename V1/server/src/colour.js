
var colors = ['black', 'yellow', 'green', 'red', 'blue'];
for(var i = 0, j = cSwitches.length; i < j; i++){
  var cSwitch = document.createElement('div');
  cSwitch.className = 'cSwitch';
  cSwitch.style.backgroundColor = colors[i];
  cSwitch.addEventListener('click',colourSwitch);
  document.getElementById('colours').appendChild(cSwitch);
}
function setColour(colour){
	context.fillStyle = colour;
	context.strokeStyle = colour;
	var active = document.getElementByClassname('active')[0];
	if(active){
		activ.className = 'cSwitch';
	}
}
function colourSwitch(e){
	var cSwitch = e.target
	setColour(cSwitch.style.background-color);
	cSwitch.className += ' active';
}
