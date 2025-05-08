import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  EMAIL_USER, // The admin's email address for contact emails
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async ({ type, from, subject, text, html, orderData }) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL_USER, // Admin's email address
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  // Conditional handling of 'from' and 'to' based on the type of email
  let mailOptions = {
    subject,
    text,
    html,
    attachments: [
      {
        filename: 'logo.png', // Updated to match the actual file name
        path: path.resolve('./client/src/assets/logo.png'),
        cid: 'banner', // This must match the cid used in the HTML
      },
    ],
  };

  // If the email is for order confirmation or order ready:
  if (type === 'order') {
    mailOptions.from = 'no-reply@pizzaday.com'; // Default no-reply email
    mailOptions.to = from; // Send the email to the customer's email address
    console.log("📧 MailOptions for Order Confirmation:", mailOptions);  // Debug log
  }

  // Handle contact form submissions:
  else if (type === 'contact') {
    mailOptions.from = from; // The email address from the contact form
    mailOptions.to = EMAIL_USER; // Admin's email address
    console.log("📧 MailOptions for Contact Form:", mailOptions);  // Debug log
  }

  // Check if 'to' is defined and not empty
  if (!mailOptions.to || mailOptions.to.trim() === "") {
    throw new Error("No recipient email address defined!");
  }

  // Send the email
  const result = await transporter.sendMail(mailOptions);
  return result;
};

