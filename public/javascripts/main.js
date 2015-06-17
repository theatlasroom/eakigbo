/**
* Main js file
*/

var cv_open_flag = false;

$(function(){
  $(document).foundation();
  init();

  var $header = $("header");
  var $cv = $("#cv");
  var $about = $("#about");

  var $cv_trigger = $("#cv-trigger");
  var $rocket = $("#cv-trigger .fa-rocket");

  $rocket.on('mouseover', function(e){
    e.preventDefault();
    $rocket
      .velocity("stop", "rocket")
      .velocity({
        rotateZ: "180deg"
      });
  });

  $rocket.on('mouseout', function(e){
    e.preventDefault();
    $rocket.velocity("stop", "rocket").velocity('reverse');
  });

  $("#cv-trigger a").on('click', function(e){
    e.preventDefault();
    cv_open_flag = !cv_open_flag; // flip the state
    if (cv_open_flag){
      $about.fadeToggle();
      $cv.velocity("transition.slideUpIn", { display: "block" },  "easeInSine");
      $header.velocity({
        top: "-3rem",
      });
    }
    else {
      $cv.velocity("transition.slideDownOut", { display: "none" }, "easeInSine");
      $about.fadeToggle();
      $header.velocity({top: "0",});
    }
  });
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
