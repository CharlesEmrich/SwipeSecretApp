$(function() {
  $('#blueBoy').on('click', function() {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/interaction',
      data: {
        status: 'approve',
        origin: 'myId',
        target: 'theirId'
      }
    });
    // .done(function() {console.log('boo');});
  });

  $('#redBoy').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/interation',
      data: {
        status: 'reject',
        origin: 'myId',
        target: 'theirId'
      }
    });
    // .done();
  });

});
