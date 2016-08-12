function compile (templateId) {
  var source = $('#' + templateId).html();
  console.log(source);
  // eslint-disable-next-line
  var template = Handlebars.compile(source);
  return template('the secret data will be passed here');
}
