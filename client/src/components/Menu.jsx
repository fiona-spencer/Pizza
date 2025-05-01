import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { menus } from "../constants"; // Assuming menus no longer includes source_code_link
import { fadeIn, textVariant } from "../utils/motion";

const Pizza = ({ index, name, description, tags, image }) => {
  return (
    <div className="flex-wrap">
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
          </div>
          <div className="mt-5">
            <h3 className="text-red-600 font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-gray-900 text-[14px]">{description}</p>
          </div>
          <div className="mt-4 gap-2 items-center">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </motion.div>
    </div>
  );
};

const Wings = ({ index, name, description, tags, image }) => {
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

const Sides = ({ index, name, description, tags, image }) => {
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
  return (
    <>
      <div>
        {/*-----PIZZA-----*/}
        <motion.div>
          <p className={styles.sectionSubText}>detroit style</p>
          <h2 className={styles.sectionHeadText}>Pizza</h2>
        </motion.div>
        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className=" white-red-900 text-[17px] max-w-5xl leading-[30px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </motion.p>
        </div>
        <div className="mt-20 flex flex-wrap gap-7">
          {menus.map((menu, index) => (
            <Pizza key={`project-${index}`} index={index} {...menu} />
          ))}
        </div>
        {/*-----WINGS-----*/}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>juicy</p>
          <h2 className={styles.sectionHeadText}>Wings</h2>
        </motion.div>
        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 white-red-900 text-[17px] max-w-5xl leading-[30px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </motion.p>
        </div>
        <div className="mt-20 flex flex-wrap gap-7">
          {menus.map((menu, index) => (
            <Wings key={`project-${index}`} index={index} {...menu} />
          ))}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </motion.p>
        </div>
        <div className="mt-20 flex flex-wrap gap-7">
          {menus.map((menu, index) => (
            <Sides key={`project-${index}`} index={index} {...menu} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Menu, "menu");
