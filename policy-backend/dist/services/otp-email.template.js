"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpEmailTemplate = void 0;
const otpEmailTemplate = (otp, name) => `
  <div style="font-family: Arial, sans-serif">
    <h2>Hello ${name},</h2>
    <p>Your OTP for <b>PolicyDukan</b> login is:</p>
    <h1 style="letter-spacing: 3px">${otp}</h1>
    <p>This OTP is valid for <b>5 minutes</b>.</p>
    <br/>
    <p>If you didn’t request this, please ignore this email.</p>
    <hr/>
    <small>PolicyDukan © ${new Date().getFullYear()}</small>
  </div>
`;
exports.otpEmailTemplate = otpEmailTemplate;
