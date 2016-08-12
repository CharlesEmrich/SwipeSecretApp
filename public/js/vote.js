function compile (templateId, content) {
  var source = $('#' + templateId).html();
  console.log(source);
  // eslint-disable-next-line
  var template = Handlebars.compile(source);
  return template(content);
}

function initSwipeView() {
  $.ajax({
    method: 'GET',
    url: '/secret/popSecret/' + localStorage.userId
  })
  .done(function(res) {
    //TODO: Use res.body to populate swipe view.
    //TODO: Stash target values in localStorage
    const secretDiv = compile('secret-template', {secret: res.secret.text});
    $('.swipe').append(secretDiv);

    localStorage.setItem('targetId', res._id);
    localStorage.setItem('targetSecretId', res.secret._id);
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
    alert('Approve failed. Whoops.');
    return false;
    //and don't allow the swipe view to change
  }).done(function(res){
    console.log('in the done');
    console.log(res);
    //TODO call popSecret
    let target = res.body;
    //TODO set to appropriate swipe view

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
    alert('Reject failed. Whoops.');
    return false;
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
    alert('Report failed. Whoops.');
    return false;
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
