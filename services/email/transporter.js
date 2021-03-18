import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH2_SECRET_KEY,
  process.env.OAUTH2_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
});

const accessToken = async () => await oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH2_SECRET_KEY,
    refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
    accessToken: accessToken(),
  },
});

export { transporter };
