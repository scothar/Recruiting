const config = require('./config');
const data = require("./assets/ProjectData");

console.log("CONFIG KEYS:", config.twilio);

const accountSid = config.twilio.account_sid;
const authToken = config.twilio.auth_token;

const client = require('twilio')(accountSid, authToken);

// const projectedAddress = {
//     alice: "+14085836571",
//     bob: "+14087223527"
//   }


const addConversation = async ( name ) => {
    let conversation = await client.conversations.conversations.create({friendlyName: name});
    console.log(`Created Conversation: ${conversation.sid}`);     
    return conversation;
}

const addChatParticipant = async ( conversationId, user, projectedAddress ) =>{
    console.log(`Adding Chat Participant to: ${conversationId} with projectedAddress: ${projectedAddress}`);
    await client.conversations.conversations(conversationId)
    .participants
    .create({
        identity: user,
        'messagingBinding.projectedAddress': projectedAddress
    })
    .then(participant => {

        console.log(`Added participant ${participant.sid} to ${conversationId}`);
        return participant.sid;
    }).catch(err =>{
        console.error(err);
    });
}

const addSMSParticipant = async (conversationId, id) => {
    console.log(`Adding SMS Participant to: ${conversationId}`);
    await client.conversations.conversations(conversationId)
    .participants
    .create({
       'messagingBinding.address': id
     })
    .then(participant => console.log(participant.sid))
    .catch(err => {
        console.error(err);
    });    
}

async function createConversation(smsId, chatId, conversationName) {
    console.log(`Creating conversation with SMS: ${smsId}; Chat: ${chatId}; conversationName ${conversationName}`);
    const conversation = await addConversation(conversationName);
    
  
    let proxy = getProxyId(chatId);

    console.log(`in createConversation, adding SMSParticipant: ${conversation.sid}`);
    const smsParticipantSid = await addSMSParticipant(conversation.sid, smsId);
    const chatParticipantSid = await addChatParticipant(conversation.sid, chatId, proxy);
    return conversation.sid;
}


/*
*Return the Proxy address for the given recruiter
*/
function getProxyId(chatId){
    let proxy = "";

    return data.recruiters.find(r => r.name == chatId).projectedAddress 

}

/*
*Find the recruiter for the candidate with this phone number
*/
async function route(conversation){

    let from = conversation["MessagingBinding.Address"];
    let customers = data.customerData;
    
    console.log("Customers", customers);
    console.log("Routing...", conversation);
    
    const recruiter = customers.find( c => c.phoneNumber === from).recruiter;
    console.log("Routing to: ", recruiter);

    await addChatParticipant(conversation.ConversationSid, recruiter, getProxyId(recruiter));

          
}

const nameConversation = async ( req ) => {
   
    let sid = req.ConversationSid;
    let from = req["MessagingBinding.Address"];
    let name = data.customerData.find( c => c.phoneNumber == from).name;


    let conversation = await client.conversations.conversations(sid).update({friendlyName: name})
    console.log(`Changed Conversation Name to: ${name}`);
    return conversation;
}

const closeConversation = async (sid) =>{
    await client.conversations.conversations(sid).update({state: 'closed'})
      .then(conversation => console.log(conversation.friendlyName));
}

const addChatToConversation= async (sid, user) => {

    let recruiters = data.recruiters;
    
    const projectedAddress = recruiters.find( r => r.name === user).projectedAddress;

    await addChatParticipant(sid, user, projectedAddress );

}

module.exports = {
    createConversation, 
    nameConversation,
    closeConversation,
    addChatToConversation,
    route
} 