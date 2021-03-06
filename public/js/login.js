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
  $.ajax({
    method: 'POST',
    url: '/auth/signin',
    contentType: 'application/json',
    data: JSON.stringify(data)
  }).fail(function(){
    alert('Uh Oh, there was an issue with either your email or password, please make the necessary changes and try again.');
    return false;
  }).done(function(res){
    resetView('swipe');
    localStorage.setItem('userId', res.payload.id);
    localStorage.setItem('token', res.token);
    initSwipeView();
  });
});
