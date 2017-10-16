(function(){

  window.onload=function(){
    var ui = {}
    ui.$print_a = document.querySelector("#print-cv");

    if (!!ui.$print_a){
      ui.$print_a.addEventListener('click', function(){
        window.print();
      });
    }
  }

})();
