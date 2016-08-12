// NOTE: OK, so we're using a modified swipe view. Can you navigate this view without voting? It seems like you should be able to?

let admirers = [];
let crushes = [];
let currentIndex = 0;

function mutualCompile(idx) {
  $.ajax({
    method: 'GET',
    url: 'secret/' + admirers[idx].originatorId.secret
  })
  .done(function(res){
    let templateContent = {
      secret: res.text,
      location: admirers[idx].originatorId.location,
      gender: admirers[idx].originatorId.gender,
      orientation: admirers[idx].originatorId.orientation,
      interestedIn: admirers[idx].originatorId.interestedIn
    };
    // console.log(templateContent);
    const matchDiv = compile('confirm-template', templateContent);
    $('#currentMatch').html(matchDiv);
  });
}

function initMutualView() {
  $.ajax({
    method: 'GET',
    url: 'interaction/mutuals/' + localStorage.userId
  })
    .fail(function(res){
      alert('Could not get mutuals');
    //and don't allow the swipe view to change
    }).done(function(res){
      admirers = res[0];
      crushes = res[1];

      mutualCompile(currentIndex);

    //NOTE: Make sure to show extra info if both of you have confirmed
    });
}

function assignMutualClickHandlers() {
    $('.acceptConfirm').on('click', function() {

      let interactionId = admirers.find(function(ele) {
        return ele.originatorId === admirers[currentIndex].originatorId;
      })._id;

      //TODO: ajax confirmation to somewhere via POST
      $.ajax({
        method: 'PUT',
        url: '/interaction/' + interactionId,
        contentType: 'application/json',
        data: {
          confirm: true
        }
      });
      //FAILURE or DONE handlers.
      //TODO: If you have both confirmed, show additional information

    });

    $('.rejectConfirm').on('click', function() {
      let admireInteraction = admirers.find(function(ele) {
        return ele.originatorId === admirers[currentIndex].originatorId;
      })._id;

      let crushInteraction = crushes.find(function(ele) {
        return ele.targetId === admirers[currentIndex].originatorId;
      })._id;

      //TODO: ajax rejection to somewhere via POST
      $.ajax({
        method: 'PUT',
        url: 'interaction/rejectMatch',
        contentType: 'application/json',
        data: {
          admireInteraction,
          crushInteraction
        }
      })
      .done(function(){
        //Remove rejectadmirersed match from mutuals.
        admirers.splice(currentIndex, 1);
        //Simulate a move-right action.
        currentIndex ++;
        if (currentIndex > admirers.length) currentIndex = 0;
        mutualCompile(currentIndex);
        //NOTE: Make sure to show extra info if both of you have confirmed
      });
    });

  $('.right').on('click', function() {
    currentIndex ++;
    if (currentIndex > admirers.length) currentIndex = 0;
    mutualCompile(currentIndex);
    //NOTE: Make sure to show extra info if both of you have confirmed
  });

  $('.left').on('click', function() {
    currentIndex --;
    if (currentIndex < 0) currentIndex = admirers.length;
    mutualCompile(currentIndex);
    //NOTE: Make sure to show extra info if both of you have confirmed
  });
}
