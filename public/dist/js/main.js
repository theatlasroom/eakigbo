"use strict";!function(e,t){function i(){console.log();var t=e.location.pathname.toLowerCase();"/cv"===t?o():r(),n()}function o(){var e=[v.$header,v.$main,v.$about,v.$footer];v.$header.velocity("transition.slideDownIn",{delay:500,queue:"init"}),v.$main.velocity("transition.slideLeftIn",{delay:1e3,queue:"init"}),v.$footer.velocity("transition.slideUpIn",{delay:1500,queue:"init"}),v.$about.velocity("transition.slideUpIn",{delay:0,queue:"init"}),t.each(e,function(t){e[t].dequeue("init")}),a()}function n(){var t="/",i="Ezekiel Kigbo";e.history.pushState({page:i},i,t)}function a(){u=!u,u?(v.$about.fadeToggle(),v.$cv.velocity("transition.slideUpIn",{display:"block"},"easeInSine"),v.$header.velocity({top:"-3rem"}),Modernizr.touch&&c()):(v.$cv.velocity("transition.slideDownOut",{display:"none"},"easeInSine"),v.$about.fadeToggle(),v.$header.velocity({top:"0"}),Modernizr.touch&&l())}function r(){var e=[v.$header,v.$main,v.$footer];v.$header.velocity("transition.slideDownIn",{delay:500,queue:"init"}),v.$main.velocity("transition.slideLeftIn",{delay:1e3,queue:"init"}),v.$footer.velocity("transition.slideUpIn",{delay:1500,queue:"init"}),t.each(e,function(t){e[t].dequeue("init")})}function c(){v.$cv_trigger_a.velocity("stop").velocity({scaleX:"1.35",scaleY:"1.35",top:"+2.5em"}),v.$rocket.velocity("stop").velocity({rotateZ:"180deg"})}function l(){v.$cv_trigger_a.velocity("stop").velocity({scaleX:"1",scaleY:"1",top:"-2.5em"}),v.$rocket.velocity("stop").velocity({rotateZ:"0deg"})}var u=!1,v={};t(function(){v.$header=t("header"),v.$main=t("main"),v.$footer=t("footer"),v.$cv=t("#cv"),v.$print_a=t("#print a"),v.$about=t("#about"),v.$cv_trigger=t("#cv-trigger"),v.$cv_trigger_a=t("#cv-trigger a"),v.$rocket=t("#cv-trigger .fa-rocket"),t(document).foundation(),v.$cv_trigger_a.on("mouseenter",function(e){e.preventDefault(),u||c()}),v.$cv_trigger_a.on("mouseleave",function(e){e.preventDefault(),u||l()}),v.$cv_trigger_a.on("click",function(e){e.preventDefault(),a(),n()}),v.$print_a.on("click",function(){e.print()}),i()})}(window,jQuery);