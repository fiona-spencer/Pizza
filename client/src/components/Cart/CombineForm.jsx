import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CombineForm() {
  const dispatch = useDispatch();

  // Extract current user and cart items from Redux store
  const { currentUser } = useSelector((state) => state.user);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [menuItemsData, setMenuItemsData] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!currentUser || cartItems.length === 0) return;

    const userId = currentUser._id; // Capture user ID from Redux

    // Build MenuItem-compatible objects
    const menuItemFormData = cartItems.map((item) => ({
      restaurantId: item.restaurantId || null,
      name: item.name,
      price: item.price,
      addOns: item.addOns?.map(addOn => ({
        name: addOn.name,
        price: addOn.price,
      })) || [],
      category: item.category || 'pizza',
      notes: item.notes || '',
      quantity: item.quantity || 1,
      userId: userId,
    }));

    setMenuItemsData(menuItemFormData);

    // Simulate MenuItem IDs from backend (mock data)
    const mockMenuItemIds = menuItemFormData.map((_, idx) => `mock-id-${idx}`);

    // Build Cart-compatible object
    const cartFormData = {
      userId,
      items: mockMenuItemIds.map((id, index) => ({
        menuItemId: id,
        quantity: menuItemFormData[index].quantity,
      })),
    };

    setCartData(cartFormData);

    // Calculate total price (subtotal), tip, and total with tax

    // Subtotal (price of items + add-ons)
    const subtotal = menuItemFormData.reduce(
      (sum, item) => sum + (item.price * item.quantity) + item.addOns.reduce((a, b) => a + b.price, 0),
      0
    );

    // Tip (added on top of subtotal)
    const tip = 5.0; // Assume a fixed $5 tip
    const totalWithTip = subtotal + tip;

    // Tax calculation: tax applied to subtotal + tip
    const taxRate = 0.13; // 13% tax rate
    const totalPriceAfterTax = +(totalWithTip * (1 + taxRate)).toFixed(2);

    // Build Order-compatible object
    const orderFormData = {
      userId,
      restaurantId: menuItemFormData[0].restaurantId, // Assuming all items are from the same restaurant
      items: cartFormData.items,
      status: 'pending',
      subtotal: subtotal,  // Subtotal (without tip and tax)
      tax: totalWithTip * taxRate, // Tax applied after adding tip
      totalWithTax: totalPriceAfterTax, // Total price after tax and tip
      totalWithTip: totalWithTip, // Total with tip added
      pickUpTime: new Date(Date.now() + 30 * 60000), // 30 mins from now
    };

    setOrderData(orderFormData);

    // Final logs for debugging
    // console.log('👤 User ID:', userId);
    // console.log('🧾 MenuItem FormData:', menuItemFormData);
    // console.log('🛒 Cart FormData:', cartFormData);
    // console.log('📦 Order FormData:', orderFormData);

  }, [currentUser, cartItems]);

  return null; // No UI rendered in this component
}
