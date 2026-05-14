import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendInvitationEmail(toEmail: string, token: string) {
  try {
    await transporter.sendMail({
      from: `"Earl's Portfolio" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: "You've been invited to leave a testimonial",
      html: `
        <div>
          <h2>You were invited to leave a testimonial</h2>
          <p>Click below to continue:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/?token=${token}#testimonials">
            Accept Invitation
          </a>
          <p>This link expires in 7 days.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return { success: false };
  }
}