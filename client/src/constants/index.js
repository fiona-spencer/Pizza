// About Images
import BlogImage from '../assets/AboutSection/BlogTo.svg';
import GlobalImage from '../assets/AboutSection/Global.svg';
import TorontoImage from '../assets/AboutSection/TorontoGaurd.svg';

// Menu Images
import { heropizza } from '../assets';

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
      title: "Location",
      description: "Explore where we’re based and what makes our location special.",
      imgSrc: BlogImage, // Update path as needed
    },
    {
      title: "Toronto Life",
      description: "Discover the culture, lifestyle, and community in Toronto.",
      imgSrc: GlobalImage,
    },
    {
      title: "Global News",
      description: "Stay updated with our latest features in the news and media.",
      imgSrc: TorontoImage,
    },
  ];
  
  const testimonials = [
    {
      testimonial: "This is a testimonial text.",
      name: "Person A",
      designation: "Position A",
      company: "Company A",
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Example image
    },
    {
      testimonial: "Another testimonial text.",
      name: "Person B",
      designation: "Position B",
      company: "Company B",
      image: "https://randomuser.me/api/portraits/women/2.jpg", // Example image
    },
    {
      testimonial: "I had a wonderful experience, highly recommend!",
      name: "Person C",
      designation: "Position C",
      company: "Company C",
      image: "https://randomuser.me/api/portraits/men/3.jpg", // Example image
    },
    {
      testimonial: "Amazing service, will definitely come back!",
      name: "Person D",
      designation: "Position D",
      company: "Company D",
      image: "https://randomuser.me/api/portraits/women/4.jpg", // Example image
    },
    {
      testimonial: "Great quality, I couldn't be happier with my experience.",
      name: "Person E",
      designation: "Position E",
      company: "Company E",
      image: "https://randomuser.me/api/portraits/men/5.jpg", // Example image
    },
    {
      testimonial: "Fantastic customer service and products!",
      name: "Person F",
      designation: "Position F",
      company: "Company F",
      image: "https://randomuser.me/api/portraits/women/6.jpg", // Example image
    },
    {
      testimonial: "Best purchase decision I've made. Highly recommend.",
      name: "Person G",
      designation: "Position G",
      company: "Company G",
      image: "https://randomuser.me/api/portraits/men/7.jpg", // Example image
    },
    {
      testimonial: "Top-notch service and quality. Will be back for sure.",
      name: "Person H",
      designation: "Position H",
      company: "Company H",
      image: "https://randomuser.me/api/portraits/women/8.jpg", // Example image
    },
    {
      testimonial: "Professional and efficient service. Highly satisfied.",
      name: "Person I",
      designation: "Position I",
      company: "Company I",
      image: "https://randomuser.me/api/portraits/men/9.jpg", // Example image
    },
    {
      testimonial: "A seamless experience from start to finish. 10/10.",
      name: "Person J",
      designation: "Position J",
      company: "Company J",
      image: "https://randomuser.me/api/portraits/women/10.jpg", // Example image
    },
  ];
  
  
  const menus = [
    {
      name: "The Dr.Mario",
      description: "Mozzarella shred blend, signature tomato sauce, house roasted chicken, sautéed garlic & parm spinach, bacon grated to order Grana Padano Chef recommends adding chilli flakes",
      tags: [
        {
          cost: "CA $21.00",
          color: "text-secondary",
        },
        {
          name: "vegetarian",
          color: "green-text-gradient",
        },
      ],
      image: heropizza,
      source_code_link:
        "https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa",
    },
    {
      name: "The Captain Planet",
      description: "Caramelized onion base, roasty mushrooms, rosemary & herb infused oil, fresh parsley garnish (VEGAN)",
      tags: [
        {
          cost: "CA $21.00",
          color: "text-secondary",
        },
        {
          name: "vegetarian",
          color: "green-text-gradient",
        },
      ],
      image: heropizza,
      source_code_link:
        "https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa",
    },
    {
      name: "The Margherita",
      description:
        "Mozzarella shred blend, signature tomato sauce, grated-to-order grana padano, fresh basil garnish.",
        tags: [
          {
            cost: "CA $21.00",
            color: "text-secondary",
          },
          {
            name: "vegetarian",
            color: "green-text-gradient",
          },
        ],
        image: heropizza,
      source_code_link:
        "https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa",
    },
    {
      name: "The Power Pepperoni",
      description:
        "Mozzarella shred blend, double cup & char pepperoni, signature tomato sauce, grated-to-order grana padano, fresh oregano garnish. Add homemade hot honey for an additional charge.",
        tags: [
          {
            cost: "CA $25.00",
            color: "text-secondary",
          },
        ],
        image: heropizza,
      source_code_link: "https://github.com/",
    },
    {
      name: "The Sanderson Sister",
      description:
        "Mozzarella shred blend, housemade trio of sauces (marinara, vodka, pesto cream), grated-to-order grana padano. Add char and cup pepperoni for an additional charge.",
        tags: [
          {
            cost: "CA $24.00",
            color: "text-secondary",
          },
          {
            name: "vegetarian",
            color: "green-text-gradient",
          },
        ],
        image: heropizza,
      source_code_link: "https://github.com/",
    },
    {
      name: "The Mushaboom",
      description: "Mozzarella shred blend, mushroom & rosemary infused cream sauce, roasty mushrooms, lemon zest, grated-to-order grana padano, fresh chive garnish.",
      tags: [
        {
          cost: "CA $25.00",
          color: "text-secondary",
        },
        {
          name: "vegetarian",
          color: "green-text-gradient",
        },
      ],
      image: heropizza,
      source_code_link: "https://github.com/",
    },
    {
      name: "The Hawaiian",
      description:
      "Mozzarella shred blend, signature tomato sauce, 8-hour roast confit pork shoulder, thinly shaved onion, housemade pineapple honey chili glaze, grated-to-order grana padano, fresh cilantro garnish.",
      tags: [
        {
          cost: "CA $24.00",
          color: "text-secondary",
        },
        {
          name: "vegetarian",
          color: "green-text-gradient",
        },
      ],
      image: heropizza,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services , testimonials, menus };
  