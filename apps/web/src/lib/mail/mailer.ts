import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTestimonialUpdate = async (
  email: string, 
  name: string, 
  status: 'approved' | 'rejected', 
  feedback?: string
) => {
  const subject = status === 'approved' 
    ? "Your testimonial is live on erzan.dev! 🎉" 
    : "Update regarding your testimonial on erzan.dev";

  await resend.emails.send({
    from: 'Erzan <noreply@erzan.dev>',
    to: email,
    subject: subject,
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Hi ${name},</h2>
        <p>Thank you for sharing your experience!</p>
        <p>Your testimonial has been <strong>${status}</strong>.</p>
        ${feedback ? `<div style="background: #f4f4f4; padding: 15px; border-radius: 8px;"><strong>Erzan's Feedback:</strong><br/>${feedback}</div>` : ''}
        <p>Check it out at <a href="https://erzan.dev">erzan.dev</a></p>
      </div>
    `
  });
};