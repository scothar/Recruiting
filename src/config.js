require('dotenv').config();

const twilio = {
        account_sid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
        auth_token: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
        api_key: process.env.REACT_APP_TWILIO_API_KEY,
        api_secret: process.env.REACT_APP_TWILIO_API_SECRET,
        sms_number: process.env.REACT_APP_TWILIO_SMS_NUMBER,
        whatsapp_number: process.env.REACT_APP_TWILIO_WHATSAPP_NUMBER,
        chat_service_sid: process.env.REACT_APP_TWILIO_CHAT_SERVICE_SID,
    }
//console.log("Read .env file: ", twilio);

module.exports = {
    twilio
};

