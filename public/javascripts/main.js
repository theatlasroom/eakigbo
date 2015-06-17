/**
* Main js file
*/

$(function(){
  $(document).foundation();
  init();

});


function init(){
  console.log("Loading");
  // init function - runs on app start
  //loadBackgroundImage();
}

function loadBackgroundImage(){
  var img = new Image();
      img.src = '/images/me-crop.png';

  var int = setInterval(function() {
      if (img.complete) {
          clearInterval(int);
          //console.log(document.getElementById('container'));
          //document.getElementById('container')[0].style.backgroundImage = 'url(' + img.src + ')';
          console.log($("#container"));
          $("#container:after").css({
            'background-image':"url(' + img.src + ')"
          });
          console.log("Loaded");
      }
  }, 50);

}
