const config = require('../config');

const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
const accountSid = config.twilio.account_sid;
const apiKey = config.twilio.api_key;
const apiSecret = config.twilio.api_secret;

// Used specifically for creating Chat tokens
const serviceSid = config.twilio.chat_service_sid;

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
console.log(`Chat Service SID: ${serviceSid} `)
const chatGrant = new ChatGrant({
        serviceSid: serviceSid,
    });

function createToken(identity) {

    console.log("Twilio keys:", config.twilio);
    console.log(`Creating Token. ACCOUNT_SID: ${accountSid} API_Key: ${apiKey}`);

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
        accountSid,
        apiKey,
        apiSecret,
        {identity: identity}
    );
    
    token.addGrant(chatGrant);
    
    // Serialize the token to a JWT string
    console.log(token.toJwt());
    return token.toJwt();

}

module.exports = {
    createToken
}