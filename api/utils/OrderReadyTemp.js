// OrderReadyEmailTemplate.js
export const OrderReadyTemp = ({ orderNumber, name, email }) => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.8; padding: 20px; background-color: #ffffff; border: 2px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
        <div style="text-align: center; margin: 20px;">
          <h1 style="color: #2c3e50; font-size: 28px; margin: 0;">Order Ready for Pickup</h1>
          <p style="color: #777; margin-top: 5px;">Your order is ready for pickup!</p>
        </div>
  
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
  
        <p style="margin-top: 20px;">Thank you for your order. You can now pick up your pizza!</p>
  
        <p style="margin-top: 30px; text-align: center;">
          Visit us at
        </p>
        <p style="margin-top: 30px; text-align: center;">
          <a href="http://localhost:5173" style="display: inline-block; background-color: #3498db; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Visit Sign Map Website
          </a>
        </p>
      </div>
    `;
  };
  