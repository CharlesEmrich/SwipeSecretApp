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

  let form = document.getElementById('signUpForm').elements;

  if(form.secret.value) {
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

  let form = document.getElementById('signUpForm').elements;

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
