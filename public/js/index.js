$(document).ready(()=>{
  $('.stepTwo').hide();
  $('.stepThree').hide();
});

$('#stepOneButton').on('click', function(e){
  e.preventDefault();
  let form = document.getElementById('signUpForm').elements;

  if(form.secret.value) {
    $('.stepOne').hide();
    $('.stepTwo').show();
    $('.stepThree').hide();
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
