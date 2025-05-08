import { sendMail } from "../utils/mail.js";

export const sendContact = async (req, res) => {
  try {
    const { from, subject, text, html } = req.body;
    const response = await sendMail({ from, subject, text, html, type: 'contact' });
    res.status(200).json({ success: true, message: 'Email sent', response });
  } catch (error) {
    console.error('SendMail Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { from, subject, text, html } = req.body;

    const response = await sendMail({
      from,
      subject,
      text,
      html,
      type: 'order',
    });

    res.status(200).json({ success: true, message: 'Order confirmed, confirmation email sent', response });
  } catch (error) {
    console.error('SendMail Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const readyOrder = async (req, res) => {
  try {
    const { from, subject, text, html } = req.body;

    const response = await sendMail({
      from,
      subject,
      text,
      html,
      type: 'order',
    });

    res.status(200).json({
      success: true,
      message: 'Order marked as ready, email sent to customer',
      response,
    });
  } catch (error) {
    console.error('SendMail Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send ready-for-pickup email',
      error: error.message,
    });
  }
};
