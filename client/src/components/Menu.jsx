import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import github from '../assets/logo.svg'
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { menus } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}


const Pizza = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)} // Using fadeIn variant
      initial="hidden"
      animate="show"
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-white p-5 squared-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover squared-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-red-600 font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-gray-900 text-[14px]">{description}</p>
        </div>
        <div className="mt-4 gap-2 items-center">
          {tags.map((tag) => (
            <div key={tag.cost}>
              <p className={`text-[24px] ${tag.color}`}>{tag.cost}</p>
              <p className={`text-[14px] ${tag.color}`}>{tag.name}</p>
            </div>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};


const Wings = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-white p-5 squared-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover squared-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 squared-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-red-600 font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Sides = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-white p-5 squared-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover squared-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 squared-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-red-600 font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Menu = () => {
  // Log the menus data
  console.log("Menus Data: ", menus);

  return (
    <>
      <div>
        {/*-----PIZZA-----*/}
        <motion.div>
          <p className={`${styles.sectionSubText} md:pt-10`}>detroit style</p>
          <h2 className={styles.sectionHeadText}>Pizza</h2>
        </motion.div>
        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="white-red-900 text-[17px] max-w-5xl leading-[30px]"
          >
            Our famous 48-hour fermented dough is always baked fresh to order. All pies are 8x10.
          </motion.p>
        </div>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-7">
          {menus.map((menu, index) => {
            // Log each menu item data
            console.log(`Rendering Pizza Item ${index}: `, menu);
            return <Pizza key={`pizza-${index}`} index={index} {...menu} />;
          })}
        </div>

        {/*-----WINGS-----*/}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>sides</p>
          <h2 className={styles.sectionHeadText}>Wings, Fries, and a</h2>
        </motion.div>
        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 white-red-900 text-[17px] max-w-5xl leading-[30px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </motion.p>
        </div>
        <div className="mt-20 flex flex-wrap gap-7">
          {menus.map((menu, index) => {
            // Log each wing item data
            console.log(`Rendering Wings Item ${index}: `, menu);
            return <Wings key={`project-${index}`} index={index} {...menu} />;
          })}
        </div>
        
        {/*-----SIDES-----*/}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Amazing</p>
          <h2 className={styles.sectionHeadText}>Sides</h2>
        </motion.div>
        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 white-red-900 text-[17px] max-w-5xl leading-[30px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </motion.p>
        </div>
        <div className="mt-20 flex flex-wrap gap-7">
          {menus.map((menu, index) => {
            // Log each side item data
            console.log(`Rendering Side Item ${index}: `, menu);
            return <Sides key={`project-${index}`} index={index} {...menu} />;
          })}
        </div>
      </div>
    </>
  );
};



export default SectionWrapper(Menu, "menu");