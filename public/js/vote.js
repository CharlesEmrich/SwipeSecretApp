//Run this when the view is initially loaded:
function initSwipeView() {
  $.ajax({
    method: 'GET',
    url: `/interaction/popSecret/${localStorage.userId}`
  })
  .done(function(res) {
    //TODO: Use res.body to populate swipe view.
  });
}


$('#approve').on('click', function() {
  $.ajax({
    method: 'POST',
    url: '/interaction',
    contentType: 'application/json',
    data: JSON.stringify(
      {
        status: 'approved',
        originatorId: localStorage.userId,
        targetId: localStorage.targetId,
        targetSecretId: localStorage.targetSecretid
      }
    )
  })
  .fail(function(res){
    console.log('in the fail');
    //TODO res contains the error message, so send this to the client
    //and don't allow the swipe view to change
  }).done(function(res){
    console.log('in the done');
    console.log(res);
    //TODO call popSecret
    let target = res.body;
    //TODO set to appropriate swipe view

    //TODO stash targetId, targetSecretId into localStorage
    localStorage.setItem('targetId', target._id);
    localStorage.setItem('targetSecretId', target.secret._id);
  });
});

$('#reject').on('click', function() {
  $.ajax({
    method: 'POST',
    url: '/interaction',
    contentType: 'application/json',
    data: JSON.stringify(
      {
        status: 'rejected',
        originatorId: localStorage.userId,
        targetId: localStorage.targetId,
        targetSecretId: localStorage.targetSecretid
      }
    )
  })
  .fail(function(res){
    console.log('in the fail');
    //TODO res contains the error message, so send this to the client
    //and don't allow the swipe view to change
  }).done(function(res){
    console.log('in the done');
    console.log(res);
    //TODO call popSecret
    let target = res.body;
    //TODO set to appropriate swipe view

    //TODO stash targetId, targetSecretId into localStorage
    localStorage.setItem('targetId', target._id);
    localStorage.setItem('targetSecretId', target.secret._id);
  });
});

$('#report').on('click', function() {
  $.ajax({
    method: 'POST',
    url: '/interaction',
    contentType: 'application/json',
    data: JSON.stringify(
      {
        status: 'reported',
        originatorId: localStorage.userId,
        targetId: localStorage.targetId,
        targetSecretId: localStorage.targetSecretid
      }
    )
  })
  .fail(function(res){
    console.log('in the fail');
    //TODO res contains the error message, so send this to the client
    //and don't allow the swipe view to change
  }).done(function(res){
    console.log('in the done');
    console.log(res);
    //TODO call popSecret
    let target = res.body;
    //TODO set to appropriate swipe view

    //TODO stash targetId, targetSecretId into localStorage
    localStorage.setItem('targetId', target._id);
    localStorage.setItem('targetSecretId', target.secret._id);
  });
});
