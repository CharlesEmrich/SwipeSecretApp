$(function() {
  $('#blueBoy').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/',
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
      url: '/',
      data: {
        status: 'reject',
        origin: 'myId',
        target: 'theirId'
      }
    });
    // .done();
  });

  
});
