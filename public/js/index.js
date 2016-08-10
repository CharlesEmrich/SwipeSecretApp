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

// when app loads OR joinButton OR logo are pressed, hides all but the "enter your secret" view
$(document).ready(()=>{
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
    this.value = this.value.replace('...','');
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
})

// hides all but the email, password, confirm view
$('#stepOneButton').on('click', function(e){
  e.preventDefault();
<<<<<<< HEAD
=======

  let form = document.getElementById('signUpForm').elements;
>>>>>>> eb2f47f5c61bb91e39a7f14862ad0a8d5e63e3b1

  if(prompts.indexOf(form.secret.value) === -1) {
    $('.stepOne').hide();
    $('.stepThree').hide();
    $('.login').hide();
    $('.swipe').hide();
    $('.confirm').hide();
    $('.contact').hide();
    $('.stepTwo').show();
    $('.entry').show();
  } else {
    //TODO: Show some kind of error: Secret is required.
  }
});

$('#stepTwoButton').on('click', function(e){
  e.preventDefault();
<<<<<<< HEAD
=======

  let form = document.getElementById('signUpForm').elements;
>>>>>>> eb2f47f5c61bb91e39a7f14862ad0a8d5e63e3b1

  if(form.password.value === form.confirm.value) {
    $('.stepOne').hide();
    $('.stepTwo').hide();
    $('.login').hide();
    $('.swipe').hide();
    $('.confirm').hide();
    $('.contact').hide();
    $('.stepThree').show();
  } else {
    //TODO: Show some kind of error: passwords don't match.
  }
});

$('#stepThreeButton').on('click', function(e){
  e.preventDefault();
  let form = document.getElementById('signUpForm').elements;
  //TODO add more to data
  let data = {
    //TODO: Is there seriously no better way to do this?
    //TODO: Current version of form has no place for names.
    firstName: '',
    lastName: '',
    password: form.password.value,
    secret: form.secret.value,
    location: form.location.value,
    phone: form.phoneNum.value,
    email: form.email.value,
    gender: form.gender.value,
    orientation: form.orientation.value,
    interestedIn: form.interestedIn.value
  };
  //console.log(data);
  $.ajax({
    method: 'POST',
    url: '/auth/signup',
    contentType: 'application/json',
    data: JSON.stringify(data)
  }).done(function(res){
    //TODO set to appropriate swipe view
    localStorage.setItem('userId', JSON.stringify(res.payload.id));
    localStorage.setItem('token', res.token);
  });
});
