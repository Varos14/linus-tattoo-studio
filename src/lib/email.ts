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
      from: 'Linus Tattoo Studio <noreply@linustattoostudio.com>',
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

interface BookingData {
  name: string;
  email: string;
  phone: string;
  placement: string;
  size: string;
  style: string;
  preferredDates: string;
  budget: string;
  references: string;
  details: string;
}

interface DepositData {
  email: string;
  amount: number;
  currency: string;
  bookingId: string;
}

export async function sendBookingConfirmationEmail(bookingData: BookingData) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Booking Confirmation - Linus Tattoo Studio</h2>
      <p>Dear ${bookingData.name},</p>
      <p>Thank you for booking with Linus Tattoo Studio. Here are the details of your booking:</p>
      <ul>
        <li><strong>Name:</strong> ${bookingData.name}</li>
        <li><strong>Email:</strong> ${bookingData.email}</li>
        <li><strong>Phone:</strong> ${bookingData.phone}</li>
        <li><strong>Placement:</strong> ${bookingData.placement}</li>
        <li><strong>Size:</strong> ${bookingData.size}</li>
        <li><strong>Style:</strong> ${bookingData.style}</li>
        <li><strong>Preferred Dates:</strong> ${bookingData.preferredDates}</li>
        <li><strong>Budget:</strong> ${bookingData.budget}</li>
        <li><strong>References:</strong> ${bookingData.references}</li>
        <li><strong>Details:</strong> ${bookingData.details}</li>
      </ul>
      <p>We will contact you soon to confirm the appointment.</p>
      <p>Best regards,<br>Linus Tattoo Studio</p>
    </div>
  `;

  await sendEmail({
    to: bookingData.email,
    subject: 'Booking Confirmation - Linus Tattoo Studio',
    html,
  });
}

export async function sendDepositConfirmationEmail(depositData: DepositData) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: depositData.currency.toUpperCase(),
  }).format(depositData.amount);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Deposit Confirmation - Linus Tattoo Studio</h2>
      <p>Dear Customer,</p>
      <p>Thank you for your deposit payment. Here are the details:</p>
      <ul>
        <li><strong>Amount:</strong> ${formattedAmount}</li>
        <li><strong>Booking ID:</strong> ${depositData.bookingId}</li>
      </ul>
      <p>Your deposit has been received and your booking is confirmed.</p>
      <p>Best regards,<br>Linus Tattoo Studio</p>
    </div>
  `;

  await sendEmail({
    to: depositData.email,
    subject: 'Deposit Confirmation - Linus Tattoo Studio',
    html,
  });
}
