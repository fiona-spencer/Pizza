// About Images
import BlogImage from '../assets/AboutSection/BlogTo.svg';
import GlobalImage from '../assets/AboutSection/global.jpg'
import TorontoImage from '../assets/AboutSection/TorontoGaurd.svg';
//test

// Menu Images
import { heropizza } from '../assets';
import margPizza from '../assets/MenuSection/marg.webp'
import pepPizza from '../assets/MenuSection/pepperoni.webp'
import sisterPizza from '../assets/MenuSection/sisters.avif'
import mushPizza from '../assets/MenuSection/mushroom.webp'
import hawPizza from '../assets/MenuSection/haw.webp'
import marioPizza from '../assets/MenuSection/mario.webp'

// Wings
import wings from "../assets/MenuSection/wings.webp"

// Sides
import garlic from "../assets/MenuSection/garlic.jpeg"
import fries from "../assets/MenuSection/fries.webp"
import salad from "../assets/MenuSection/salad.webp"
import poutine from "../assets/MenuSection/poutine.webp"
import sticks from "../assets/MenuSection/sticks.jpg"

// Instagram Image
import insta1 from '../assets/InstaSection/insta_1.webp'
import insta2 from '../assets/InstaSection/insta_2.webp'
import insta3 from '../assets/InstaSection/insta_3.webp'
import insta4 from '../assets/InstaSection/insta_4.webp'
import insta5 from '../assets/InstaSection/insta_5.avif'
import insta7 from '../assets/InstaSection/insta_7.webp'
import insta9 from '../assets/InstaSection/insta_9.jpg'

export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "menu",
      title: "Menu",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Toronto Life",
      description: "I almost died in a fire. It inspired me to pursue my dream of making pizza for a living",
      imgSrc: BlogImage,
      link: "https://torontolife.com/memoir/fire-dream-job-hooray-for-pizza-day/", // Replace with actual URL
    },
    {
      title: "Global News",
      description: "Man opens restaurant on anniversary of arson fire in Toronto that upended his life",
      imgSrc: GlobalImage,
      link: "https://globalnews.ca/news/10343161/toronto-man-arson-fire-pizza-restaurant-opening-6-years/",
    },
    {
      title: "Toronto Gaurdian",
      description: "Homegrown Business: Sasha Warunkiewicz of Hooray for Pizza Day",
      imgSrc: TorontoImage,
      link: "https://torontoguardian.com/2024/08/toronto-business-hooray-for-pizza-day/",
    },
  ];
  
  const testimonials = [
    {
      testimonial: "Can’t say enough great things about Hooray For Pizza Day! I’ve tried most of the pizzas and each is superb.",
      name: "Marek Warunkiewicz",
      designation: "Local Guide",
      image: "https://lh3.googleusercontent.com/a/ACg8ocKeqUk6sVpBuqS3NWhgdJFP3E7vQqv-0pJ7aJaalv8tuAXOfA=w72-h72-p-rp-mo-ba3-br100", // Example image
    },
    {
      testimonial: `Wow. What a pleasant surprise to discover that "grabbing a bite" after class meant discovering chef Adam's delectable pizza!!`,
      name: "France Raymond",
      designation: "Google Review",
      image: "https://lh3.googleusercontent.com/a/ACg8ocLCqi8JYlF0o_4CvWBJOwPE3FX8wVTHiulFj9y-baF0sEh6pg=w72-h72-p-rp-mo-br100", // Example image
    },
    {
      testimonial: "Amazing pizza. Flavourful, fresh ingredients. Cooked to perfection, and the crust is crispy and delicious. Also a great size for a personal pizza...",
      name: "Sam Polito",
      designation: "Local Guide Level 3",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjXhMJkrrGfoJL25Gazs36TYOTAd1sQbzC_Jz1x3K0jyEc-BD2s=w72-h72-p-rp-mo-br100", // Example image
    },
    {
      testimonial: "The pizzas are absolutely phenomenal! Try the mozzarella sticks, too! I give this place the highest marks possible!",
      name: "Jennifer Spencer",
      designation: "Google Review",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjUBznJIIfD8Rv-2EeMCsNHca3KMxfWoYzjRK7gjTKr2D4-B68s=w72-h72-p-rp-mo-br100", // Example image
    },
    {
      testimonial: "Can’t say enough great things about Hooray For Pizza Day! I’ve tried most of the pizzas and each is superb.",
      name: "Marek Warunkiewicz",
      designation: "Local Guide",
      image: "https://lh3.googleusercontent.com/a/ACg8ocKeqUk6sVpBuqS3NWhgdJFP3E7vQqv-0pJ7aJaalv8tuAXOfA=w72-h72-p-rp-mo-ba3-br100", // Example image
    },
    {
      testimonial: `Wow. What a pleasant surprise to discover that "grabbing a bite" after class meant discovering chef Adam's delectable pizza!!`,
      name: "France Raymond",
      designation: "Google Review",
      image: "https://lh3.googleusercontent.com/a/ACg8ocLCqi8JYlF0o_4CvWBJOwPE3FX8wVTHiulFj9y-baF0sEh6pg=w72-h72-p-rp-mo-br100", // Example image
    },
    {
      testimonial: "Amazing pizza. Flavourful, fresh ingredients. Cooked to perfection, and the crust is crispy and delicious. Also a great size for a personal pizza...",
      name: "Sam Polito",
      designation: "Local Guide Level 3",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjXhMJkrrGfoJL25Gazs36TYOTAd1sQbzC_Jz1x3K0jyEc-BD2s=w72-h72-p-rp-mo-br100", // Example image
    },
    {
      testimonial: "The pizzas are absolutely phenomenal! Try the mozzarella sticks, too! I give this place the highest marks possible!",
      name: "Jennifer Spencer",
      designation: "Google Review",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjUBznJIIfD8Rv-2EeMCsNHca3KMxfWoYzjRK7gjTKr2D4-B68s=w72-h72-p-rp-mo-br100", // Example image
    }
  ];
  
  
  const pizzas = [
    {
      name: "The Dr.Mario",
      category: "pizza",
      description:
        "Mozzarella shred blend, signature tomato sauce, house roasted chicken, sautéed garlic & parm spinach, bacon grated to order Grana Padano Chef recommends adding chilli flakes",
      tags: [
        {
          price: 21,
          color: "text-secondary",
        },
        {
          name: "",
          color: "green-text-gradient",
        },
      ],
      image: marioPizza,
      source_code_link:
        "https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa",
    },
    {
      name: "The Captain Planet",
      category: "pizza",
      description:
        "Caramelized onion base, roasty mushrooms, rosemary & herb infused oil, fresh parsley garnish (VEGAN)",
      tags: [
        {
          price: 21,
          color: "text-secondary",
        },
        {
          name: "vega",
          color: "blue-text-gradient",
        },
      ],
      image: heropizza,
      source_code_link:
        "https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa",
    },
    {
      name: "The Margherita",
      category: "pizza",
      description:
        "Mozzarella shred blend, signature tomato sauce, grated-to-order grana padano, fresh basil garnish.",
      tags: [
        {
          price: 21,
          color: "text-secondary",
        },
        {
          name: "veg",
          color: "green-text-gradient",
        },
      ],
      image: margPizza,
      source_code_link:
        "https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa",
    },
    {
      name: "The Power Pepperoni",
      category: "pizza",
      description:
        "Mozzarella shred blend, double cup & char pepperoni, signature tomato sauce, grated-to-order grana padano, fresh oregano garnish.",
      tags: [
        {
          price: 25,
          color: "text-secondary",
        },
      ],
      image: pepPizza,
    },
    {
      name: "The Sanderson Sister",
      category: "pizza",
      description:
        "Mozzarella shred blend, housemade trio of sauces (marinara, vodka, pesto cream), grated-to-order grana padano.",
      tags: [
        {
          price: 24,
          color: "text-secondary",
        },
        {
          name: "veg",
          color: "green-text-gradient",
        },
      ],
      image: sisterPizza,
    },
    {
      name: "The Mushaboom",
      category: "pizza",
      description:
        "Mozzarella shred blend, mushroom & rosemary infused cream sauce, roasty mushrooms, lemon zest, grated-to-order grana padano, fresh chive garnish.",
      tags: [
        {
          price: 25,
          color: "text-secondary",
        },
        {
          name: "veg",
          color: "green-text-gradient",
        },
      ],
      image: mushPizza,
    },
    {
      name: "The Hawaiian",
      category: "pizza",
      description:
        "Mozzarella shred blend, signature tomato sauce, 8-hour roast confit pork shoulder, thinly shaved onion, housemade pineapple honey chili glaze, grated-to-order grana padano, fresh cilantro garnish.",
      tags: [
        {
          price: 24,
          color: "text-secondary",
        },
        {
          name: "",
          color: "green-text-gradient",
        },
      ],
      image: hawPizza,
    },
  ];
  

  const instaImages = [
    insta1,
    insta2,
    insta3,
    insta4,
    insta5,
    insta7,
    insta9,
  ];


  const sides = [
    {
      name: "Garlic Knots",
      category: "knots",
      description: "Soft, buttery garlic knots served with marinara.",
      tags: [
        {
          name: "veg",
          price: 6,
          color: "text-green-600",
        },
      ],
      image: garlic,
      source_code_link: "",
    },
    {
      name: "Caesar Salad",
      category: "salad",
      description:
        "Crisp romaine, house made croutons, bacon, tossed in our signature caesar dressing, grated to order Grana Padano.",
      tags: [
        {
          name: "",
          price: 12,
          color: "text-green-600",
        },
      ],
      image: salad,
      source_code_link: "",
    },
    {
      name: "Fresh Cut Fries",
      category: "fries",
      description: "House made fresh cut fries served with ketchup.",
      tags: [
        {
          name: "vega",
          price: 8,
          color: "text-blue-600",
        },
      ],
      image: fries,
      source_code_link: "",
    },
    {
      name: "Poutine",
      category: "poutine",
      description:
        "House-made fresh cut fries, squeaky cheese curds, house-made gravy.",
      tags: [
        {
          name: "",
          price: 14,
          color: "text-green-600",
        },
      ],
      image: poutine,
      source_code_link: "",
    },
    {
      name: "Mozzarella Sticks",
      category: "sticks",
      description:
        "Hand-breaded and fried to perfection. Served with marinara, grated to order Grana Padano, fresh parsley garnish.",
      tags: [
        {
          name: "veg",
          price: 14,
          color: "text-green-600",
        },
      ],
      image: sticks,
      source_code_link: "",
    },
  ];
  
  
  const wingsImages = [
    {
      name: "1 Pound Wings",
      category: "wing",
      description: "Choose a wing sauce with 1 pound, or upgrade to 2 pounds for $27 and pick 2 sauces.",
      image: wings, // replace with actual image path
      price: 15,
      sauces: [
        { name: "Plain", hotLevel: 0 },
        { name: "Salt and Peppa", hotLevel: 0 },
        { name: "Garlic Parm", hotLevel: 0 },
        { name: "Honey Garlic", hotLevel: 0 },
        { name: "Filipino Adobo", hotLevel: 0 },
        { name: "Classic BBQ", hotLevel: 0 },
        { name: "Hot Honey", hotLevel: 1 },
        { name: "Sticky Pineapple", hotLevel: 1 },
        { name: "Franks Red Hot Sauce", hotLevel: 2 },
        { name: "Smoked BBQ Heat", hotLevel: 2 },
        { name: "Honey Gochujang", hotLevel: 3 },
        { name: "Tibetal Fire", hotLevel: 3 },
        { name: "Suicide", hotLevel: 4 },
      ],
    },
  ];
  
  const addOns = {
    pizza:  [
        { name: "House Made Ranch", price: 2.5 },
        { name: "Signature Tomato Sauce", price: 2.5 },
        { name: "House Made Mushroom Sauce", price: 2.5 },
        { name: "House Made Hot Honey", price: 2.5 },
        { name: "Creamy Garlic", price: 2.5 },
        { name: "House Made Blue Cheese", price: 2.5 },
        { name: "Honey Gochujang", price: 2.5 },
        { name: "Chipotle Mayo", price: 2.5 }
      ],
      additionalToppings: [
        { name: "Pepperoni", price: 2.5 }
      ],
    wing: {
      veggieDip: [
        { name: "House Made Ranch (choose one)", price: 0, included: false },
        { name: "House Made Blue Cheese (choose one)", price: 0, included: false },
        { name: "Extra Ranch", price: 2.5, included: false },
        { name: "Extra Blue Cheese", price: 2.5, included: false }
      ],
      wingSauce: [
        { name: "Plain", price: 0 },
        { name: "Salt and Peppa", price: 0 },
        { name: "Garlic Parm", price: 0 },
        { name: "Honey Garlic", price: 0 },
        { name: "Filipino Adobo", price: 0 },
        { name: "Classic BBQ", price: 0 },
        { name: "Hot Honey", price: 0 },
        { name: "Sticky Pineapple", price: 0 },
        { name: "Franks Red Hot Sauce", price: 0 },
        { name: "Smoked BBQ Heat", price: 0 },
        { name: "Honey Gochujang", price: 0 },
        { name: "Tibetan Curry", price: 0 },
        { name: "Suicide", price: 0 },
      ],
      extraSauce: [
        { name: "Extra Saucey", price: 2.5 },
      ],
    },
    salad:  [
        { name: "Extra Salad Dressing", price: 2.5 },
        { name: "Grilled Chicken Breast", price: 5.0 }
      ],
    fries: [
      { name: "Add Chipotle Mayo", price: 1.5 },
      { name: "Add Guinness Gravy", price: 4.0 }
    ],
    knots: [
      { name: "Upgrade to Pesto Sauce", price: 0.95 },
      { name: "Upgrade to Vodka Sauce", price: 0.95 },
      { name: "Sanderson Style Upgrade", price: 2.0 }
    ],
    sticks: [
      { name: "Upgrade to Pesto Sauce", price: 0.95 },
      { name: "Upgrade to Vodka Sauce", price: 0.95 },
      { name: "Sanderson Style Upgrade", price: 2.0 }
    ],
    poutine: [
      { name: "Add Bacon", price: 2.0 },
      { name: "Add Mushroom", price: 1.5 }
    ]
  };
  
  
  
  
  
  export { services , testimonials, pizzas, instaImages, sides, wingsImages, addOns };
  