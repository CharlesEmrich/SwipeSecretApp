// const $ = require('jquery');

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

  $('.stepOne').hide();
  $('.stepThree').hide();
  $('.login').hide();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.stepTwo').show();
  $('.entry').show();
});

$('#stepTwoButton').on('click', function(e){
  e.preventDefault();
  $('.stepOne').hide();
  $('.stepTwo').hide();
  $('.login').hide();
  $('.swipe').hide();
  $('.confirm').hide();
  $('.contact').hide();
  $('.stepThree').show();
});

$('#stepThreeButton').on('click', function(e){
  e.preventDefault();
  let form = document.getElementById('signUpForm').elements;
  //TODO add more to data
  let data = {
    email: form.email.value,
    password: form.password.value
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
