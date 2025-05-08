export const OrderPlacedTemp = ({ orderData }) => {
  const { items, subtotal, tax, tip, totalWithTip, totalWithTax, pickUpTime, userName } = orderData;

  // Format the pickUpTime (assuming it's in a valid date string format)
  const orderPlacedTime = new Date().toLocaleString(); // Get the current time as the order placed time
  const readyTime = new Date(new Date().getTime() + 15 * 60000).toLocaleString(); // Add 15 minutes to the current time for ready time

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; line-height: 1.8; padding: 0; background-color: #fbe4e4; border-radius: 10px; overflow: hidden; border: 1px solid #e74c3c; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <!-- Embedded Image using cid -->
      <div style="text-align: center;">
        <img src="cid:banner" alt="Pizzaday Banner" style="width: 60%; height: auto; padding: 30px;" />
      </div>

      <div style="padding: 20px; background-color: #ffffff;">
        <h1 style="color: #e74c3c; font-size: 26px; text-align: center; margin-bottom: 5px;">Thanks, Your Order Has Been Placed!</h1>
        <p style="color: #555; text-align: center;">Thank you for placing an order with Pizzaday, ${userName}!</p>

        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #e74c3c; background-color: #fbe4e4; color: #333;">
          <h3 style="color: #c0392b;">Order Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
         <ul style="list-style-type: none; padding-left: 0;">
  ${items.map(item => {
    const addOns = item.addOns ? item.addOns.map(addOn => `${addOn.name} ($${addOn.price})`).join(", ") : '';
    return `
      <li style="padding: 10px 0; color: #333; border-bottom: 1px solid #e74c3c;">
<strong style="color: #e74c3c;">${item.itemName}</strong> - $${((item.price - (item.addOns?.reduce((sum, addOn) => sum + (addOn.price || 0), 0) || 0)) * item.quantity).toFixed(2)} x ${item.quantity}
        ${addOns ? `<br><em>Extras: ${addOns}</em>` : ""}
        ${item.notes ? `<br><em>Note: ${item.notes}</em>` : ""}
      </li>
    `;
  }).join('')}
</ul>

          </ul>
          <div style="margin-top: 15px; font-weight: bold;">
            <p><span style="color: #c0392b;">Subtotal:</span> $${subtotal.toFixed(2)}</p>
            <p><span style="color: #c0392b;">Tax (13%):</span> $${tax.toFixed(2)}</p>
            <p><span style="color: #c0392b;">Tip:</span> $${tip.toFixed(2)}</p>
            <p><span style="color: #c0392b;">Total:</span> $${totalWithTax.toFixed(2)}</p>
          </div>
        </div>

        <!-- Added Order Placed and Ready Time -->
   <p style="margin-top: 20px; text-align: center; font-weight: bold; font-size: 18px; color: #2c3e50;">Order placed on: <span style="color: #e74c3c;">${orderPlacedTime}</span></p>
        <p style="margin-top: 20px; text-align: center; font-weight: bold; font-size: 18px; color: #2c3e50;">Ready for pickup around: <span style="color: #e74c3c;">${readyTime}</span></p>

        <p style="margin-top: 20px; text-align: center; font-size: 16px; color: #555; font-style: italic;">You will be notified when it's ready for pickup.</p>


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
            <a href="https://www.instagram.com/pizzaday" style="color: #e74c3c; text-decoration: none; margin-right: 15px;">Instagram</a>
            <a href="https://www.doordash.com/store/pizzaday" style="color: #e74c3c; text-decoration: none; margin-right: 15px;">DoorDash</a>
            <a href="https://www.ubereats.com/store/pizzaday" style="color: #e74c3c; text-decoration: none;">Uber Eats</a>
          </div>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">&copy; 2025 Pizzaday. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
};
