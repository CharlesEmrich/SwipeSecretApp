// grab email and password
// validate that it's the correct email/pw
// store the token and user id in the local storage
$('#loginButton').on('click', function(e){
  e.preventDefault();
  let form = document.getElementById('loginForm').elements;

  let data = {
    email: form.email.value,
    password: form.password.value
  };
  console.log(data);
  $.ajax({
    method: 'POST',
    url: '/auth/signin',
    contentType: 'application/json',
    data: JSON.stringify(data)
  }).fail(function(res){
    console.log('in the fail');
    //TODO res contains the error message, so send this to the client
    //and don't allow the swipe view to change
  }).done(function(res){
    console.log('in the done');
    console.log(res);
    //TODO set to appropriate swipe view
    localStorage.setItem('userId', JSON.stringify(res.payload.id));
    localStorage.setItem('token', res.token);
  });
});
