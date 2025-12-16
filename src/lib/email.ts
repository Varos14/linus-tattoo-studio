import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
