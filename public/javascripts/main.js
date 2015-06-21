'use strict';
/**
* Main js file
*/

(function(window, $){

  var cv_open_flag = false;
  var ui = {};

  $(function(){
    ui.$header = $("header");
    ui.$main = $("main");
    ui.$footer = $("footer");
    ui.$cv = $("#cv");
    ui.$print_a = $("#print a");
    ui.$about = $("#about");
    ui.$cv_trigger = $("#cv-trigger");
    ui.$cv_trigger_a = $("#cv-trigger a");
    ui.$rocket = $("#cv-trigger .fa-rocket");

    $(document).foundation();

    var rocket_trigger = {};
    // check for touch
    rocket_trigger.grow = ((Modernizr.touch)) ? 'touchstart' : 'mouseenter';
    rocket_trigger.shrink = ((Modernizr.touch)) ? 'touchend' : 'mouseleave';

    // ui bindings
    ui.$cv_trigger_a.on(rocket_trigger.grow, function(e){
      e.preventDefault();
      ui.$cv_trigger_a
        .velocity('stop')
        .velocity({
          scaleX:"1.35",
          scaleY:"1.35",
          top: "+2.5em"
        });
      ui.$rocket
        .velocity('stop')
        //.velocity("stop", "rocket")
        .velocity({
          rotateZ: "180deg"
        });
    });

    ui.$cv_trigger_a.on(rocket_trigger.shrink, function(e){
      e.preventDefault();
      ui.$cv_trigger_a
        .velocity('stop')
        .velocity({
          scaleX:"1",
          scaleY:"1",
          top: "-2.5em"
        });
      ui.$rocket
        .velocity('stop')
        //.velocity("stop", "rocket")
        .velocity({
          rotateZ: "0deg"
        });
    });

    ui.$cv_trigger_a.on('click', function(e){
      e.preventDefault();
      cv_open_flag = !cv_open_flag; // flip the state
      if (cv_open_flag){
        ui.$about.fadeToggle();
        ui.$cv.velocity("transition.slideUpIn", { display: "block" },  "easeInSine");
        ui.$header.velocity({
          top: "-3rem",
        });
      }
      else {
        ui.$cv.velocity("transition.slideDownOut", { display: "none" }, "easeInSine");
        ui.$about.fadeToggle();
        ui.$header.velocity({top: "0",});
      }
    });

    ui.$print_a.on('click', function(){
      window.print();
    });

    init();
  });

  function init(){
    var elems = [ui.$header, ui.$main, ui.$footer];
    // init function - runs on app start
    ui.$header.velocity("transition.slideDownIn", {delay: 500, queue: 'init'});
    ui.$main.velocity("transition.slideLeftIn", {delay: 1000, queue: 'init'});
    ui.$footer.velocity("transition.slideUpIn", {delay: 1500, queue: 'init'});
    // run the animations
    $.each(elems, function(k){
      elems[k].dequeue('init');
    });
  }
})(window, jQuery);
