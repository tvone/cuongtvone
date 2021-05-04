const nodemailer = require('nodemailer')
require('dotenv').config()
const {google} = require('googleapis')
const {OAuth2} = google.auth
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env


const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND,
)

//SEND EMAIL TO USER:

const sendEmail = (to,url,txt)=>{
    try {

    oauth2Client.setCredentials({
    refresh_token : MAILING_SERVICE_REFRESH_TOKEN
   })
   const accessToken =  oauth2Client.getAccessToken()
   let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret : MAILING_SERVICE_CLIENT_SECRET,
        refreshToken : MAILING_SERVICE_REFRESH_TOKEN,
        accessToken
    }
});
   const mailOptions = {
       from : SENDER_EMAIL_ADDRESS,
       to : to,
       subject : "WEB MOVIE",
       html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #cbd930; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: #7ab014;">K63MMT</h2>
            <p>Hello chào mừng tới với Website Movie By cuongtvone</p>
            
            <a href=${url} 
            style="background: #7ab014; text-decoration: none; color: white; 
            padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}
            </a>
        
            <p>Hoặc bạn có thể bấm ở đây: </p>
        
            <div>${url}</div>
            </div>
        `
    }
   
   
    transporter.sendMail(mailOptions,(err,info)=>{
       if(err) return err;
       return info
   })

    } catch (error) {
        console.log(error)
    }
   
}

module.exports = sendEmail