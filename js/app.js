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

  $('#contactme-form').submit(function(e){
    if ($('#contactme-form').find('.form-error.is-visible').length || $('form').find('.is-invalid-label').length) {
      $('#contactme .success').hide();
    }
    else {
      if(grecaptcha.getResponse() === "") {
        $('#contactme .custom').show();
        return;
      }
      var data = {};
      var URL = 'https://4qx0ylodic.execute-api.us-west-2.amazonaws.com/prod';
      //var URL = 'https://jsonplaceholder.typicode.com/posts';

      $( this ).serializeArray().map(function(x){data[x.name] = x.value;});

      $.ajax({
        type: 'POST',
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          console.log("success");
          $('#contactme-form')[0].reset();
          $('#contactme .success').show();
          grecaptcha.reset();
        },
        error: function () {
          console.log("failure");
        }
      });

    }
  });

});
