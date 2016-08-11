// hides all but the email, password, confirm view
$('#stepOneButton').on('click', function(e){
  e.preventDefault();

  // eslint-disable-next-line
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
    alert('Ruh Roh Shaggy, please remember to insert your own secret.');
    return false;
  }
});

$('#stepTwoButton').on('click', function(e){
  e.preventDefault();

  // eslint-disable-next-line
  if((form.password.value === form.confirm.value ) && (/\s+@\s+\.\s+/.test(form.email.value))) {

    $('.stepOne').hide();
    $('.stepTwo').hide();
    $('.login').hide();
    $('.swipe').hide();
    $('.confirm').hide();
    $('.contact').hide();
    $('.stepThree').show();
  } else {
    alert('Oopsie daisy, either your email format isn\'t valid or your passwords don\t match.');
    return false;
  }
});

$('#stepThreeButton').on('click', function(e){
  e.preventDefault();

  let data = {
    firstName: form.firstName.value,
    password: form.password.value,
    secret: form.secret.value,
    location: form.location.value,
    phone: form.phoneNum.value,
    email: form.email.value,
    gender: form.gender.value,
    orientation: form.orientation.value,
    interestedIn: form.interestedIn.value
  };

  $.ajax({
    method: 'POST',
    url: '/auth/signup',
    contentType: 'application/json',
    data: JSON.stringify(data)
  }).done(function(res){
    initSwipeView();
    localStorage.setItem('userId', JSON.stringify(res.payload.id));
    localStorage.setItem('token', res.token);
  });
});
