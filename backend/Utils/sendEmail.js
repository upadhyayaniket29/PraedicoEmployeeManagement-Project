import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  console.log(`Attempting to send email via Gmail (IPv4/SSL) for: ${process.env.EMAIL_USER}`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      servername: 'smtp.gmail.com'
    },
    family: 4, // Force IPv4 (Crucial for some cloud providers)
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });

  const fromName = process.env.EMAIL_FROM_NAME || "Praedico Admin";
  const fromEmail = process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Detailed Email Error: ${error.message}`);
    throw error;
  }
};
