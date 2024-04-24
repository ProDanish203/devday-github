import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const sendVerificationMail = async ({ type, email, userId }) => {
  try {
    const token = await bcrypt.hash(userId.toString(), 10);
    if (!token) return;

    if (type === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (type === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    } else return;

    const transporter = await nodemailer.createTransport({
      pool: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const subject = `Github | ${type === "VERIFY" ? "Verify your email" : "Reset password"}`;
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${type === "VERIFY"}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    padding: 20px;
                }
                .container {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .button {
                    background-color: #4CAF50;
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>${type === "VERIFY" ? "Verify your email" : "Reset password"}</h2>
                <p>Please click the button below to ${type === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                <a href="${process.env.BASE_DOMAIN}/${type === "VERIFY" ? "verify-email" : "reset-password"}?token=${token}">
                    <button class="button">${type === "VERIFY" ? "Verify Email" : "Reset Password"}</button>
                </a>
            </div>
        </body>
        </html>
        `;

    const mailOptions = {
      from: "danishsidd203@gmail.com",
      to: email,
      html,
      subject,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendPasscodeMail = async ({ email, projectName, passCode }) => {
  try {
    const transporter = await nodemailer.createTransport({
      pool: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const subject = `Github | Your Passcode to join ${projectName}`;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Login with code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                padding: 20px;
            }
            .container {
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .code {
                font-size: 28px;
                font-weight: bold;
                padding: 30px 10px;
                background-color: #333;
                color: #fff;
                display: grid;
                place-items: center;
                margin: 20px auto;
                border-radius: 10px;
                width: 350px;
                text-align: center;
            }
            h1{
                font-size: 20px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Login to ${projectName}</h1>
            <div class="code">${passCode}</div>
            <p>Copy and paste the temporary verification code to log in. If you didn't try to sign in, you can safely ignore this email.</p>
            <p>GITHUB</p>
        </div>
    </body>
    </html>
`;

    const mailOptions = {
      from: "danishsidd203@gmail.com",
      to: email,
      html,
      subject,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
