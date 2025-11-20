import nodemailer from "nodemailer";

const createTransporter = () => {
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  return nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    ignoreTLS: true,
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || "no-reply@zoomride.local";

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

export const sendBookingConfirmation = async ({ booking, user, payment }) => {
  const subject = "Your ZoomRide booking confirmation";
  const html = `
    <h1>Booking Confirmed</h1>
    <p>Hi ${user.fullName},</p>
    <p>Your booking for ${booking.car.title} is confirmed for ${
    booking.startDate
  } to ${booking.endDate}.</p>
    <p>Payment status: ${payment.status}</p>
    <p>Transaction ID: ${payment.transactionId}</p>
    <p>We will reach out soon with pickup instructions.</p>
  `;

  await sendEmail({ to: user.email, subject, html });
};

