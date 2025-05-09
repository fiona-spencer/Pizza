export const ContactEmailTemp = ({ name, email, message }) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; line-height: 1.8; padding: 0; background-color: #fff0f0; border-radius: 10px; overflow: hidden; border: 1px solid #e74c3c; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      
      <!-- Embedded Image using cid -->
<div style="text-align: center;">
  <img src="cid:banner" alt="Pizzaday Banner" style="width: 60%; height: auto; margin-bottom: 20px; padding: 30px;" />
</div>
      <div style="padding: 20px; background-color: #ffffff;">
        <h1 style="color: #e74c3c; font-size: 26px; text-align: center; margin-bottom: 5px;">Someone sent you a message!</h1>
        <p style="color: #555; text-align: center;">You've received a new message via the contact form</p>

        <p><strong style="color: #c0392b;">From:</strong> ${name} (${email})</p>

        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #e74c3c; background-color: #fff5f5; color: #333;">
          ${message.replace(/\n/g, "<br>")}
        </div>

        <p style="margin-top: 30px; text-align: center;">Visit us at:</p>
        <p style="text-align: center; margin-bottom: 10px;">
          <a href="http://localhost:5173" style="display: inline-block; background-color: #e74c3c; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Go to Pizzaday
          </a>
        </p>

        <!-- Footer with Social Links and Order Link -->
        <div style="margin-top: 40px; text-align: center; color: #555;">
          <p style="font-size: 14px; color: #777;">Stay connected with us:</p>
          <div style="margin-top: 10px;">
           <a href="https://www.instagram.com/hooray_forpizzaday/" style="color: #e74c3c; text-decoration: none; margin-right: 15px;">Instagram</a>
            <a href="https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/37986546/?utm_campaign=gpa" style="color: #e74c3c; text-decoration: none; margin-right: 15px;">DoorDash</a>
            <a href="https://www.ubereats.com/ca/store/hooray-for-pizza-day/Gw28btzTVMy_OMN-PcZBPg?srsltid=AfmBOooH-wW8FDjEEQXtX3_wFhCelIsDpb6lJ8BTM9SMtkPzaEgd-U4P" style="color: #e74c3c; text-decoration: none;">Uber Eats</a>
          </div>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">&copy; 2025 Pizzaday. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
};
