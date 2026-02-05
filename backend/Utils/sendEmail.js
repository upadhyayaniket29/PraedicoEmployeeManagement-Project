import { Resend } from 'resend';

export const sendEmail = async (options) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log(`Attempting to send email via Resend API for: ${options.email}`);

  const fromName = process.env.EMAIL_FROM_NAME || "Praedico Admin";
  // NOTE: Resend usually requires a verified domain if using custom from address.
  // For the 'onboarding' key, it might require a specific sender.
  const fromEmail = "onboarding@resend.dev"; // Default Resend test sender

  try {
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [options.email],
      subject: options.subject,
      text: options.message,
      html: options.html,
    });

    if (error) {
      console.error(`Resend API Error: ${error.message}`);
      throw new Error(error.message);
    }

    console.log(`Email sent successfully via Resend: ${data.id}`);
    return data;
  } catch (error) {
    console.error(`Detailed Email Error (Resend): ${error.message}`);
    throw error;
  }
};
