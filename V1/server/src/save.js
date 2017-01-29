

function saveImage(){
  var data = canvas.toDataURL();


  window.open(data, 'blank','location=0, menubar=0');
}
