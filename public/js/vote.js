function compile (templateId, content) {
  var source = $('#' + templateId).html();
  // console.log(source);
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
    const secretDiv = compile('secret-template', {secret: res.secret.text});
    $('#currentSecret').html(secretDiv);

    localStorage.setItem('targetId', res._id);
    localStorage.setItem('targetSecretId', res.secret._id);
  });
}

function assignVoteClickHandlers() {
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
      // console.log(res);
      const secretDiv = compile('secret-template', {secret: res.secret.text});
      //NOTE: The below can be used to handle users with multiple secrets:
      // res.secret[Math.floor(Math.random() * res.secret.length)].text
      $('#currentSecret').html(secretDiv);

      localStorage.setItem('targetId', res._id);
      localStorage.setItem('targetSecretId', res.secret._id);
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
      // console.log(res);
      const secretDiv = compile('secret-template', {secret: res.secret.text});
      //NOTE: The below can be used to handle users with multiple secrets:
      // res.secret[Math.floor(Math.random() * res.secret.length)].text
      $('#currentSecret').html(secretDiv);

      localStorage.setItem('targetId', res._id);
      localStorage.setItem('targetSecretId', res.secret._id);
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
      //and don't allow the swipe view to change
    }).done(function(res){
      // console.log(res);
      const secretDiv = compile('secret-template', {secret: res.secret.text});
      //NOTE: The below can be used to handle users with multiple secrets:
      // res.secret[Math.floor(Math.random() * res.secret.length)].text
      $('#currentSecret').html(secretDiv);

      localStorage.setItem('targetId', res._id);
      localStorage.setItem('targetSecretId', res.secret._id);

      alert('Thanks for bringing this to our attention!');
      return false;
    });
  });
}
