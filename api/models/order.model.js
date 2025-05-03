import mongoose from 'mongoose';

// Pizza Schema

const pizzaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      enum: [
        "mario",
        "captain planet",
        "margherita",
        "pepperoni",
        "sanderson sister",
        "mushaboom",
        "hawaiian",
      ], // Enum values in lowercase
    },
    price: {
      type: String, // Price of the pizza (e.g., "CA 21.00")
      required: true,
    },
    addOns: [
      {
        name: {
          type: String,
          required: true,
        },
        cost: {
          type: String, // Add on cost (e.g., "CA 2.00")
          required: true,
        },
      },
    ],
    notes: {
      type: String, // Notes for pizza (e.g., no cheese, extra sauce)
      default: '',
    },
  });

const Pizza = mongoose.model('Pizza', pizzaSchema);



// Wings Schema
import mongoose from 'mongoose';

const wingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String, // Price of the wings (e.g., "CA 15")
    required: true,
  },
  sauces: [
    {
      name: {
        type: String,
        required: true,
        enum: [
          "Plain", 
          "Salt and Peppa", 
          "Honey Garlic", 
          "Classic BBQ", 
          "Smoked BBQ Heat", 
          "Hot Honey", 
          "Franks Red Hot Sauce", 
          "Honey Gochujang", 
          "Tibetal Currey", 
          "Suicide"
        ], // Enum for predefined sauce types
      },
    },
  ],
  addOns: [
    {
      name: {
        type: String,
        required: true,
      },
      cost: {
        type: String, // Price for the add-on (e.g., "CA 2.00")
        required: true,
      },
    },
  ],
  notes: {
    type: String, // Notes for wings (e.g., no sauce, extra spicy)
    default: '',
  },
});

const Wing = mongoose.model('Wing', wingSchema);


// Sides Schema
const sideSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String, // Price of the side (e.g., "CA 6.00")
      required: true,
    },
    addOns: [
      {
        name: {
          type: String,
          required: true,
        },
        cost: {
          type: String, // Add on cost (e.g., "CA 2.00")
          required: true,
        },
      },
    ],
    notes: {
      type: String, // Notes for sides (e.g., extra dressing, no croutons)
      default: '',
    }
  });

// Main Order Schema
const orderSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    pizza: [pizzaSchema], // Array of pizzas
    wings: [wingSchema], // Array of wings
    sides: [sideSchema], // Array of sides
    orderDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String, // General notes for the entire order
      default: '',
    },
    totalAmount: {
      type: Number, // Total amount for the order (pre-tax)
      required: true,
    },
    preTaxAmount: {
      type: Number, // Pre-tax total
      required: true,
    },
    postTaxAmount: {
      type: Number, // Post-tax total
      required: true,
    },
    taxAmount: {
      type: Number, // Calculated tax amount (e.g., 13%)
      required: true,
    },
    status: {
      type: String,
      enum: ['sent', 'accepted', 'preparing', 'ready'],
      default: 'sent',
    },
  });
  
  
  // Calculate the total amount of the order, tax, pre-tax, and post-tax costs
  orderSchema.pre('save', function (next) {
    let total = 0;
  
    // Calculate total for pizzas
    this.pizza.forEach((pizza) => {
      total += parseFloat(pizza.price.replace('CA ', ''));
      
      // Add the cost of add-ons (if any)
      pizza.addOns.forEach((addOn) => {
        total += parseFloat(addOn.cost.replace('CA ', ''));
      });
    });
  
    // Calculate total for wings
    this.wings.forEach((wing) => {
      total += parseFloat(wing.price.replace('CA ', ''));
    });
  
    // Calculate total for sides
    this.sides.forEach((side) => {
      total += parseFloat(side.price.replace('CA ', ''));
      
      // Add the cost of add-ons (if any)
      side.addOns.forEach((addOn) => {
        total += parseFloat(addOn.cost.replace('CA ', ''));
      });
    });
  
    // Set pre-tax amount
    this.preTaxAmount = total;
  
    // Tax rate (13% as an example)
    const taxRate = 0.13;
  
    // Calculate tax amount (pre-tax * tax rate)
    this.taxAmount = total * taxRate;
  
    // Set post-tax amount (pre-tax + tax amount)
    this.postTaxAmount = total + this.taxAmount;
  
    // Set the total amount (pre-tax)
    this.totalAmount = total;
  
    next();
  });
  
  const Order = mongoose.model('Order', orderSchema);
  
  export default Order;
  