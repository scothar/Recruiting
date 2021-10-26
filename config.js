try {
  require('dotenv').config();
} catch (e) { 
  console.error('error loading dotenv', e);
}

console.log(process.env.TWILIO_ACCOUNT_SID);
console.log(process.env.TWILIO_API_KEY);

module.exports = {
  twilio: {
    account_sid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    auth_token: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    api_key: process.env.REACT_APP_TWILIO_API_KEY,
    api_secret: process.env.REACT_APP_TWILIO_API_SECRET,
    sms_number: process.env.REACT_APP_TWILIO_SMS_NUMBER,
    whatsapp_number: process.env.REACT_APP_TWILIO_WHATSAPP_NUMBER,
    chat_service_sid: process.env.REACT_APP_TWILIO_CHAT_SERVICE_SID,
  },
  port: process.env.REACT_APP_PORT || 3001,
  ngrokSubdomain: process.env.REACT_APP_NGROK
}
