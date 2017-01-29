

function saveImage(){
  var data = canvas.toDataURL();

  var request = new XMLHttpRequest();

  request.onreadystatechange = function (){
    if(request.readyState == 4 && request.satus == 200){
      var resp = request.responseText;
      window.open(data, 'blank','location=0, menubar=0');
    }
  }
  request.open('POST', 'save.php', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send('img='+data);
  //window.open(data, 'blank','location=0, menubar=0');
}
