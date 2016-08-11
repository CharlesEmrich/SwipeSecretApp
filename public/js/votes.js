$(function() {
  $('#blueBoy').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/interaction',
      contentType: 'application/json',
      data: JSON.stringify(
        {
          status: 'approved'
          // originatorId: localStorage.userId,
          // targetId: '', //where are we storing this? 
          // targetSecretId: '' //where are we storing this?
        }
      )
    })
    .done(function(a) {console.log('res', a);});
  });

  $('#redBoy').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/interaction',
      data: {
        status: 'reject',
        origin: 'myId',
        target: 'theirId'
      }
    });
    // .done();
  });

});
