// NOTE: OK, so we're using a modified swipe view. Can you navigate this view without voting? It seems like you should be able to?

let mutuals = [];
let currentIndex = 0

//On view-load:
$.ajax({
  method: 'GET',
  url: '[something]/mutuals',
  contentType: 'application/json',
  data: {
    userId: localStorage.userId
    //I honestly think that's all we need?
  }
}).fail(function(res){
  console.log('in the fail');
  //TODO res contains the error message, so send this to the client
  //and don't allow the swipe view to change
}).done(function(res){
  console.log('in the done');
  console.log(res);
  mutuals = res;
  // TODO: Populate the view usings mutuals[0].originatorId
  //NOTE: Make sure to show extra info if both of you have confirmed
});

//Click handlers

$('#moveright').on('click', function() {
  currentIndex ++;
  if (currentIndex > mutuals.length) currentIndex = 0;
  //TODO: populate the view using mutuals[currentIndex]
  //NOTE: Make sure to show extra info if both of you have confirmed
});

$('#moveleft').on('click', function() {
  currentIndex --;
  if (currentIndex < 0) currentIndex = mutuals.length;
  //TODO: populate the view using mutuals[currentIndex]
  //NOTE: Make sure to show extra info if both of you have confirmed

});

$('#acceptMatch').on('click', function() {
  //TODO: ajax confirmation to somewhere via POST (creating interaction or nah?)

  //TODO: If you have both confirmed, show additional information
});

$('#rejectMatch').on('click', function() {
  //TODO: ajax rejection to somewhere via POST (creating interaction or nah?)

  //Remove rejected match from mutuals.
  mutuals.splice(currentIndex, 1);
  //Simulate a move-right action.
  currentIndex ++;
  if (currentIndex > mutuals.length) currentIndex = 0;
  //TODO: populate the view using mutuals[currentIndex]
  //NOTE: Make sure to show extra info if both of you have confirmed

});
