require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT
const authToken = process.env.TWILIO_TOKEN
const verifySid = process.env.TWILIO_VERIFY
const client = require("twilio")(accountSid, authToken);

const express = require('express')
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure


module.exports={
  sentotp :(number) =>{
    client.verify.v2 
  .services(verifySid)
  .verifications.create({ to: `+91 ${number} `, channel: "sms" })
 },
    check: async (otpCode,number) => {
          try{
    const status = await client.verify.v2
              .services(verifySid)
              .verificationChecks.create({ to: `+91 ${number}`, code: otpCode });
               return status
          }catch(err){
              console.log(err);
          }   
      }
    }