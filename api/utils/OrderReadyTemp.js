export const OrderReadyTemp = ({ userInfo }) => {
  const { name, items } = userInfo;

  const readyTime = new Date().toLocaleString(); // Time the order is marked ready

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; line-height: 1.8; padding: 0; background-color: #fbe4e4; border-radius: 10px; overflow: hidden; border: 1px solid #e74c3c; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <!-- Banner Image -->
      <div style="text-align: center;">
        <img src="cid:banner" alt="Pizzaday Banner" style="width: 60%; height: auto; padding: 30px;" />
      </div>

      <div style="padding: 20px; background-color: #ffffff;">
        <h1 style="color: #e74c3c; font-size: 26px; text-align: center; margin-bottom: 5px;">Your Order is Ready for Pickup!</h1>
        <p style="color: #555; text-align: center;">Hi ${name}, your order is hot and ready to go.</p>

        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #e74c3c; background-color: #fbe4e4; color: #333;">
          <h3 style="color: #c0392b;">Order Summary:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            ${items.map(item => `
              <li style="padding: 10px 0; color: #333; border-bottom: 1px solid #e74c3c;">
                <strong style="color: #e74c3c;">${item.itemName}</strong> x ${item.quantity}
              </li>
            `).join('')}
          </ul>
        </div>

        <p style="margin-top: 20px; text-align: center; font-weight: bold; font-size: 18px; color: #2c3e50;">
          Ready on: <span style="color: #e74c3c;">${readyTime}</span>
        </p>

        <p style="margin-top: 20px; text-align: center; font-size: 16px; color: #555; font-style: italic;">
          Please come to the counter when you arrive.
        </p>

        <div style="text-align: center; margin-top: 20px;">
  <a href="https://www.google.com/maps/place/2800+Danforth+Ave,+Toronto,+ON+M4C+1M1" target="_blank" rel="noopener noreferrer">
    <img src="cid:mapimage" alt="Pizzaday Location Map" style="width: 100%; max-width: 500px; border-radius: 8px; margin: 0 auto;" />
  </a>
  <p style="color: #e74c3c; font-size: 15px; margin: 10px 0 4px;">
    <a href="https://www.google.com/maps/place/2800+Danforth+Ave,+Toronto,+ON+M4C+1M1" target="_blank" rel="noopener noreferrer" style="color: #e74c3c; text-decoration: underline;">
      2800 Danforth Ave, Toronto, ON M4C 1M1
    </a>
  </p>
  <p style="font-weight: bold; font-size: 14px; margin: 2px 0 0;">Phone:</p>
  <p style="margin: 2px 0 0;">
    <a href="tel:+14165516540" style="text-decoration: underline; color: #e74c3c; font-size: 14px;">(416) 551-6540</a>
  </p>
</div>


        <p style="margin-top: 30px; text-align: center;">Visit us at:</p>
        <p style="text-align: center; margin-bottom: 10px;">
          <a href="http://localhost:5173" style="display: inline-block; background-color: #e74c3c; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Go to Pizzaday
          </a>
        </p>

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
