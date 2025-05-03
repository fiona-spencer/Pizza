import mongoose from 'mongoose';

// Pizza Schema
import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [
    {
      cost: {
        type: String,
        required: true,
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
      price: {
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
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      name: {
        type: String,
        required: true,
      },
      cost: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],
  image: {
    type: String, // Image path or URL
    required: true,
  },
  notes: {
    type: String, // Notes for sides (e.g., extra dressing, no croutons)
    default: '',
  },
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
    type: Number, // Total amount for the order
    required: true,
  },
});

// Calculate the total amount of the order based on the items selected
orderSchema.pre('save', function (next) {
  let total = 0;

  // Calculate total for pizzas
  this.pizza.forEach((pizza) => {
    pizza.tags.forEach((tag) => {
      if (tag.cost) {
        total += parseFloat(tag.cost.replace('CA ', ''));
      }
    });
  });

  // Calculate total for wings
  this.wings.forEach((wing) => {
    total += parseFloat(wing.price.replace('CA ', ''));
  });

  // Calculate total for sides
  this.sides.forEach((side) => {
    side.tags.forEach((tag) => {
      if (tag.cost) {
        total += parseFloat(tag.cost.replace('CA ', ''));
      }
    });
  });

  // Set the total amount for the order
  this.totalAmount = total;

  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
