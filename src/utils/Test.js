//const config = require('../config');


//console.log("SIDs: ", config.twilio);

const customers = [
  { id: 4084, name: "Scott", phoneNumber: "+14083142771", recruiter: "alice" },
  { id: 4093, name: "Ashok", phoneNumber: "+16509992000", recruiter: "alice" },
  { id: 4099, name: "Neha", phoneNumber: "+19258886464", recruiter: "alice" }
];


const testFilter = () => {
  const x = customers.filter(el => {
    console.log(el);
    return el.phoneNumber === "+14083142771";
  });

  console.log(x);
  console.log(x[0].phoneNumber);

}

const testParse = () =>{
  
  const req = {
    MessagingServiceSid: 'MGa052e614891b844cf2c9832c9302dabc',
    RetryCount: '0',
    EventType: 'onConversationAdded',
    State: 'active',
    Attributes: '{}', 
    DateCreated: '2021-09-01T21:04:56.971Z',
    ChatServiceSid: 'IS6f05031e3288400ea5dc73174bc9b4b5',
    'MessagingBinding.ProxyAddress': '+14085836571',
    'MessagingBinding.Address': '+14083142771',
    AccountSid: 'AC0a277fd7670d0bbb5f8002b8b130493a',
    Source: 'SMS',
    ConversationSid: 'CH6adea15faf6a49baa3012434d2fd9a8d'
  }

  console.log(req["MessagingBinding.Address"]);

}

testParse();