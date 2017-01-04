$(document).foundation();
Foundation.Abide.defaults.patterns['telephone'] = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
$(document).ready(function(){

  $('#widemenu ul a').click(function(e) {
    e.preventDefault();
    var headerheight = $('#widemenu').height();
    var elementposition = $( $(this).attr('href') ).offset().top;
    var isDocked = $('#widemenu').hasClass('is-stuck');
    if(!isDocked)
      headerheight = headerheight * 2;
    var newposition = elementposition - headerheight;

    $('html, body').stop().animate({
      scrollTop: newposition
    }, 750);
  });

  $('#offCanvasLeft ul a').click(function(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $( $(this).attr('href') ).offset().top
    }, 750);
    $('#offCanvasLeft').foundation('close');
  });

});
