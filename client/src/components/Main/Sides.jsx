import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import SideItem from "../Modal/SideItem";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { sides } from "../../constants";

const Sides = () => {
  return (
    <div className="-mt-10">
      <motion.div>
        <p className={`${styles.sectionSubText}  text-xs`}>more to love</p> {/* Smaller font size */}
        <h2 className={`${styles.sectionHeadText} mt-2`}>Sides</h2> {/* Smaller font size */}
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-[17px] lg:text-xl max-w-5xl pb-8 pt-2 text-red-900"
        >
          Classic sides to complete your meal – fresh, crispy, and delicious.
        </motion.p> {/* Smaller font size */}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-7">
        {sides.map((side, index) => (
          <SideItem key={`side-${index}`} index={index} {...side} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Sides, "sides");
