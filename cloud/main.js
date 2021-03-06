
Parse.Cloud.define('hello', function(req, res) {
  
const AccessToken = require('twilio').AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Used when generating any kind of tokens
const twilioAccountSid = 'AC47976f9751ff0e322bf020101f4ccf33';
const twilioApiKey = 'SK96a6cf9d7dc08456b0fac4faf62704fc';
const twilioApiSecret = 'x5JeCQ6VL3camGjDOIVdQdpQoAND7KXl';

// Used specifically for creating Video tokens
const configurationProfileSid = 'VS1879021977593a2dc8f87f0f836ee319';
const identity = 'user';

// Create a "grant" which enables a client to use Video as a given user
const videoGrant = new VideoGrant({
    configurationProfileSid: configurationProfileSid
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
token.addGrant(videoGrant);
token.identity = identity;

// Serialize the token to a JWT string
// console.log(token.toJwt());
  
  res.success(token.toJwt());
});

Parse.Cloud.define('hellopush', function(req, res) {
  	    var channel = (request.params.role == 0 ? "s_" : "t_") + request.params.topicid;
				var alertmsg = "A " + request.params.categoryname + (request.params.role == 0 ? " teacher" : " student") + " is available."
				Parse.Push.send({
					channels: [channel],
					data: {
						expiration_interval: 300,
						alert: alertmsg,
						topicid: request.params.topicid,
						role: (request.params.role == 0 ? "t" : "s")
					}
				},  {
				success: function() {
					alert("Push was successful");
				},
				error: function(error) {
					alert("Push error");
				}
				});
  
});
