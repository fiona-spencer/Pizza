import BlogImage from '../assets/AboutSection/BlogTo.svg';
import GlobalImage from '../assets/AboutSection/Global.svg';
import TorontoImage from '../assets/AboutSection/TorontoGaurd.svg';


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
      image: "https://randomuser.me/api/portraits/men/1.jpg", // You can add any image URL
    },
    {
      testimonial: "Another testimonial text.",
      name: "Person B",
      designation: "Position B",
      company: "Company B",
      image: "https://randomuser.me/api/portraits/women/2.jpg", // Add another image URL
    },
    // Add more testimonials as needed
  ];
  
  
  
  const menus = [
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
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services , testimonials, menus };
  