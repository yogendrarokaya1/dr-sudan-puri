import nodemailer from "nodemailer";
import { config } from "../config/env.config";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  await transporter.sendMail({
    from: `"Dr. Sudan Puri" <${config.email.user}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};

export const passwordResetEmailTemplate = (
  name: string,
  resetLink: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1A3C6E;">Password Reset Request</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>You requested to reset your password. Click the button below:</p>
      <a href="${resetLink}" 
         style="background-color: #1A3C6E; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 4px; display: inline-block;">
        Reset Password
      </a>
      <p style="color: #666; margin-top: 16px;">
        This link expires in <strong>15 minutes</strong>.
      </p>
      <p style="color: #666;">
        If you didn't request this, please ignore this email.
      </p>
      <hr style="border-color: #eee;" />
      <p style="color: #999; font-size: 12px;">Dr. Sudan Puri — Personal Website</p>
    </div>
  `;
};