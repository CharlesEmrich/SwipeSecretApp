const prompts = [
    'I cannot ',
    'I wish ',
    'I blame ',
    'I\'m afraid that ',
    'I will only ',
    'No one knows that ',
    'I will never ',
    'I worry that',
    'I shouldn\'t ',
    'I\'ve always suspected ',
    'You don\'t know I ',
    'You\'d never guess I',
    'As a kid, I ',
    'Finally, I ',
    'I don\'t believe ',
    'I believe ',
    'I\'m scared that '
  ];
const form = document.getElementById('signUpForm').elements;

$(document).ready(()=>{
  $('.stepTwo').hide();
  $('.stepThree').hide();

  //Populates secret form field with a prompt
  //TODO: Make it so these can end with an ellipse that disappears when someone clicks into the form slot.
  $('[name = "secret"]').val(prompts[Math.floor(Math.random() * prompts.length)]);
  $('[name = "secret"]').change(function() {
    console.log(this);
  })
});

$('#stepOneButton').on('click', function(e){
  e.preventDefault();

  if(prompts.indexOf(form.secret.value) === -1) {
    $('.stepOne').hide();
    $('.stepTwo').show();
    $('.stepThree').hide();
  } else {
    //TODO: Show some kind of error: Secret is required.
  }
});

$('#stepTwoButton').on('click', function(e){
  e.preventDefault();

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
