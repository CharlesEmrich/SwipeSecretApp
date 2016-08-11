const prompts = [
    'I cannot ...',
    'I wish ...',
    'I blame ...',
    'I\'m afraid that ...',
    'I will only ...',
    'No one knows that ...',
    'I will never ...',
    'I worry that ...',
    'I shouldn\'t ...',
    'I\'ve always suspected ...',
    'You don\'t know I ...',
    'You\'d never guess I',
    'As a kid, I ...',
    'Finally, I ...',
    'I don\'t believe ...',
    'I believe ...',
    'I\'m scared that ...'
  ];
const form = document.getElementById('signUpForm').elements;

function resetView (divClass) {
  $('.stepOne').hide();
  $('.stepTwo').hide();
  $('.stepThree').hide();
  $('.login').hide();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.' + divClass).show();
}

// when app loads OR joinButton OR logo are pressed, hides all but the "enter your secret" view
$(document).ready(function(){
  $('.stepTwo').hide();
  $('.stepThree').hide();
  $('.login').hide();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.entry').show();
  $('.stepOne').show();


  //Populates secret form field with a prompt
  $('[name = "secret"]').val(prompts[Math.floor(Math.random() * prompts.length)]);
  $('[name = "secret"]').one('keypress', function() {
    this.placeholder = this.placeholder.replace('...','');
  });
});

$('#joinNav').on('click', function(e){
  e.preventDefault();
  $('.stepTwo').hide();
  $('.stepThree').hide();
  $('.login').hide();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.entry').show();
  $('.stepOne').show();
});

$('#logo').on('click', function(e){
  e.preventDefault();
  $('.stepTwo').hide();
  $('.stepThree').hide();
  $('.login').hide();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.entry').show();
  $('.stepOne').show();
});

// hides all but the login view
$('#loginNav').on('click', function(e){
  e.preventDefault();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.stepOne').hide();
  $('.stepTwo').hide();
  $('.stepThree').hide();
  $('.entry').hide();
  $('.login').show();
});
