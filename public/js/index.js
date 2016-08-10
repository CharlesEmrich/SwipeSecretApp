$(document).ready(()=>{
  $('.stepTwo').hide();
  $('.stepThree').hide();
});

$('#stepOneButton').on('click', function(e){
  e.preventDefault();
  $('.stepOne').hide();
  $('.stepTwo').show();
  $('.stepThree').hide();
});

$('#stepTwoButton').on('click', function(e){
  e.preventDefault();
  $('.stepOne').hide();
  $('.stepTwo').hide();
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
