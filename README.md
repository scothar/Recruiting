# The Demo Conversations App

This is a lightweight application based on [Twilio Chat](https://www.twilio.com/docs/chat).

# Configuring and getting started

## Copy .env.example to .env

In your local project directory, make a copy of the `.env.example` file

```cp .env.example .env```

This demo requires a Twilio account and a working Chat Service SID.
You'll need to collect some credentials from the [Twilio Console](https://www.twilio.com/console):
* Your Account SID (`ACXXX`) and Auth Token, both accessible from the [Dashboard](https://twilio.com/console/dashboard)
* Your Account's Chat Service Sid `ISXXX` SID which is attached to your Chat Service
* Your ngrok [subdomain](https://dashboard.ngrok.com/endpoints/domains). Make sure you [connect your account](https://dashboard.ngrok.com/get-started/setup) by following Step 2 in the link.

Once you have the above info, update your .env file
You only need these settings for this app:

```
REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_CHAT_SERVICE_SID=ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_PORT=3001
REACT_APP_NGROK=xxxxxxxxxxx
```

## Update ProjectData.js
Make a copy of the `ProjectData.js.example` file. **Note:** Make sure the phone numbers are all different, because they're used as row identifiers. You should set the `phoneNumber` field to the mobile numbers of the people you want to text.

```cp src/assets/ProjectData.js.example src/assets/ProjectData.js```

This is the sample ProjectData file:

```
{ id: 4084, name: "Scott", phoneNumber: "+1XXXXXXXXXX", recruiter: "alice", address: "100 Main Street", coordinator: "bob" },
{ id: 4093, name: "Leslie", phoneNumber: "+1XXXXXXXXXX", recruiter: "alice", address: "32108 Main Street", coordinator: "bob" },
{ id: 4099, name: "Neha",  phoneNumber: "+1XXXXXXXXXX", recruiter: "alice", address: "90543 Main Street", coordinator: "bob" },
{ id: 5010, name: "Aimee", phoneNumber: "+1XXXXXXXXXX", recruiter: "alice", address: "3854 Main Street", coordinator: "bob" }
```


Make sure the projectedAddresses are valid Twilio phone numbers in your account
```
const recruiters = [
  {name: "alice", vcf: "https://XXXXXXXXXXXXXXXXXXXXXX/alice.vcf", projectedAddress: "+14085836571" },
  {name: "bob",   vcf: "https://XXXXXXXXXXXXXXXXXXXXXX/bob.vcf",   projectedAddress: "+14087223527" }
]
```
There are sample VCF files in the assets directory, you can upload these as [Assets](https://console.twilio.com/us1/develop/assets/classic?frameUrl=%2Fconsole%2Fassets%2Fpublic%3Fx-target-region%3Dus1) in your project




Make sure the phone numbers for the above records are unique and accurate.
