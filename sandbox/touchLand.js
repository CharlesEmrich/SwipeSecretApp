
    $(function() {
      //Enable swiping...
      $('#redBoy').swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          $(this).text('You swiped ' + direction );
          //This is a jQuery implementation. Superagent can do the same job.
          $.ajax({
            method: 'POST',
            url: '/interaction',
            data: {
              //The request body goes here.
            }
          });
          //optionally: .done( //do some stuff)
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:0
      });
    });
