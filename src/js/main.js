/**
* Main js file
*/

require('npm/jquery')
require('npm/foundation-sites');
require('npm/velocity-animate');
require('npm/fontawesome');

(function($){
  'use strict';

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

    // ui bindings
    ui.$cv_trigger_a.on('mouseenter', function(e){
      e.preventDefault();
      if (!cv_open_flag){ growRocket(); }
    });

    ui.$cv_trigger_a.on('mouseleave', function(e){
      e.preventDefault();
      if (!cv_open_flag){ shrinkRocket(); }
    });

    ui.$cv_trigger_a.on('click', function(e){
      e.preventDefault();
      toggleCv();
      updateHistory();
    });

    ui.$print_a.on('click', function(){
      window.print();
    });

    // start the router
    route();
  });

  function route(){
    var _route = window.location.pathname.toLowerCase();
    if (_route === '/cv'){
      cvPage();
    }
    else {
      homePage();
    }
    updateHistory();
  }

  function cvPage(){
    var elems = [ui.$header, ui.$main, ui.$about, ui.$footer];
    // init function - runs on app start
    ui.$header.velocity("transition.slideDownIn", {delay: 500, queue: 'init'});
    ui.$main.velocity("transition.slideLeftIn", {delay: 1000, queue: 'init'});
    ui.$footer.velocity("transition.slideUpIn", {delay: 1500, queue: 'init'});
    ui.$about.velocity("transition.slideUpIn", {delay: 0, queue: 'init'});
    // run the animations
    $.each(elems, function(k){
      elems[k].dequeue('init');
    });
    toggleCv();
  }

  function updateHistory(){
    //var url = (cv_open_flag) ? "/cv" : "/";
    //var title = (cv_open_flag) ? "CV - Ezekiel Kigbo" : "Home - Ezekiel Kigbo";
    var url = "/";
    var title = "Ezekiel Kigbo";
    window.history.pushState({page: title}, title, url);
  }

  function toggleCv(){
    cv_open_flag = !cv_open_flag; // flip the state
    if (cv_open_flag){
      ui.$about.fadeToggle();
      ui.$cv.velocity("transition.slideUpIn", { display: "block" },  "easeInSine");
      ui.$header.velocity({
        top: "-3rem",
      });
      growRocket();
    }
    else {
      //page('/');
      ui.$cv.velocity("transition.slideDownOut", { display: "none" }, "easeInSine");
      ui.$about.fadeToggle();
      ui.$header.velocity({top: "0",});
      shrinkRocket();
    }
  }

  function homePage(){
    var elems = [ui.$header, ui.$main, ui.$footer];
    // init function - runs on app start
    console.log(elems);
    console.log(ui.$header);
    ui.$header.velocity("transition.slideDownIn", {delay: 500, queue: 'init'});
    ui.$main.velocity("transition.slideLeftIn", {delay: 1000, queue: 'init'});
    ui.$footer.velocity("transition.slideUpIn", {delay: 1500, queue: 'init'});
    // run the animations
    $.each(elems, function(k){
      elems[k].dequeue('init');
    });
  }

  function growRocket(){
    ui.$cv_trigger_a
      .velocity('stop')
      .velocity({
        scaleX:"1.35",
        scaleY:"1.35",
        top: "+2.5em"
      });
    ui.$rocket
      .velocity('stop')
      .velocity({
        rotateZ: "180deg"
      });
  }

  function shrinkRocket(){
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
  }
})(jQuery);
