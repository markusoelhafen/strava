var strava = require('strava-v3');

//console.log(strava.oauth.getRequestAccessURL({scope:"view_private,write"}));

strava.oauth.getToken("4876eeffe6b9a6c98e911ee3731f94164f53944c",function(err,payload) {
  console.log(payload);
});
