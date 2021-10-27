# The Demo Conversations App

This is a lightweight application based on [Twilio Chat](https://www.twilio.com/docs/chat).

# Configuring and getting started

## Copy .env.example to .env
```user@machine cp .env.example .env```

This demo requires a Twilio account and a working Chat Service SID.
You'll need to collect some credentials from the [Twilio Console](https://www.twilio.com/console):
* Your Account SID (`ACXXX`) and Auth Token, both accessible from the [Dashboard](https://twilio.com/console/dashboard)
* Your Account's Chat Service Sid `ISXXX` SID which is attached to your Chat Service


Once you have the above info, update your .env file
You only need these settings for this app:

```REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_CHAT_SERVICE_SID=ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_PORT=3001
REACT_APP_NGROK=xxxxxxxxxxx```

## Update ProjectData.js

Update the following infomration in src/assets/ProjectData.js

```
  { id: 4084, name: "Scott", phoneNumber: "+14083142771", recruiter: "alice" },
  { id: 4093, name: "Leslie", phoneNumber: "+16176052240", recruiter: "alice" },
  { id: 4099, name: "Neha",  phoneNumber: "+19258886464", recruiter: "alice" },
  { id: 5010, name: "Aimee", phoneNumber: "+16508629043", recruiter: "alice" }ts/ProjectData.js```


Make sure the phone numbers for the above records are unique and accurate.

In the following, make sure the projectedAddresses are valid Twilio phone numbers in your account
```
const recruiters = [
  {name: "alice", vcf: "https://scotts-lab-1976.twil.io/alice.vcf", projectedAddress: "+14085836571" },
  {name: "bob",   vcf: "https://scotts-lab-1976.twil.io/bob.vcf",   projectedAddress: "+14087223527" }
]
```



