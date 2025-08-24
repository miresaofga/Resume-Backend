const nodemailer = require('nodemailer');

// Configure transporter using Gmail (or use another provider)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App password or Gmail password
  },
});

// Send registration email
async function sendRegistrationEmail(to, name) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Welcome to Resume & Cover Letter Builder!',
      html: `<h2>Welcome${name ? ', ' + name : ''}!</h2><p>Thank you for registering. Start building your AI-powered resume and cover letter now!</p>`
    });
    console.log('Registration email sent:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
}

// Send payment confirmation email
async function sendPaymentEmail(to, name) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Subscription Activated!',
      html: `<h2>Thank you${name ? ', ' + name : ''}!</h2><p>Your payment was successful and your subscription is now active. Enjoy premium features!</p>`
    });
    console.log('Payment confirmation email sent:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw error;
  }
}

// Send admin notification on payment
async function sendAdminPaymentNotification(userEmail, userName) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Payment Received',
      html: `<h2>New Payment Received</h2><p>User: ${userName || 'Unknown'}<br>Email: ${userEmail}</p>`
    });
    console.log('Admin payment notification email sent:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
  } catch (error) {
    console.error('Error sending admin payment notification email:', error);
    throw error;
  }
}

module.exports = {
  sendRegistrationEmail,
  sendPaymentEmail,
  sendAdminPaymentNotification,
};
