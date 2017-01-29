var cSwitches = document.getElementByClassname('cSwitch');
for(var i = 0, j = cSwitches.length; i < j; i++){
	cSwitches[i].addEventListener('click', colourSwitch);
}

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
