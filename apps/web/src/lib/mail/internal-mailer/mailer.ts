// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendTestimonialUpdate = async (
//   email: string, 
//   name: string, 
//   status: 'approved' | 'rejected', 
//   feedback?: string
// ) => {
//   const subject = status === 'approved' 
//     ? "Your testimonial is live on erzan.dev! 🎉" 
//     : "Update regarding your testimonial on erzan.dev";

//   await resend.emails.send({
//     from: 'Erzan <noreply@erzan.dev>',
//     to: email,
//     subject: subject,
//     html: `
//       <div style="font-family: sans-serif; color: #333;">
//         <h2>Hi ${name},</h2>
//         <p>Thank you for sharing your experience!</p>
//         <p>Your testimonial has been <strong>${status}</strong>.</p>
//         ${feedback ? `<div style="background: #f4f4f4; padding: 15px; border-radius: 8px;"><strong>Erzan's Feedback:</strong><br/>${feedback}</div>` : ''}
//         <p>Check it out at <a href="https://erzan.dev">erzan.dev</a></p>
//       </div>
//     `
//   });
// };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendModerationEmail({ to, name, approved, feedback }: any) {
  const subject = approved 
    ? "Your testimonial has been published!" 
    : "Update regarding your testimonial";

  const statusMessage = approved 
    ? "Great news! Your testimonial was approved and is now live on the site."
    : "Thank you for submitting a testimonial. I've reviewed it but have decided not to publish it at this time.";

  try {
    await transporter.sendMail({
      from: `"Earl's Portfolio" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2>Hi ${name},</h2>
          <p>${statusMessage}</p>
          
          ${feedback ? `
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; font-weight: bold;">Note from Earl:</p>
              <p style="margin: 5px 0 0 0; color: #555;">"${feedback}"</p>
            </div>
          ` : ''}

          <p style="margin-top: 30px;">Best,<br>Earl</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send moderation email:", error);
  }
}