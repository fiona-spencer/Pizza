import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { motion } from "framer-motion";
import PizzaItem from "../Modal/PizzaItem";
import { pizzas } from "../../constants";
import { fadeIn } from "../../utils/motion";

const Pizza = () => {
  return (
    <div id="menu">
      <motion.div>
        <p className={`${styles.sectionSubText} md:pt-12 -mt-9`}>detroit style</p>
        <h2 className={styles.sectionHeadText}>Pizza</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-[17px] lg:text-xl max-w-5xl pb-8 pt-4 text-red-900"
        >
          Our famous 48-hour fermented dough is always baked fresh to order. All pies are 8x10.
        </motion.p>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {pizzas.map((menu, index) => (
          <PizzaItem key={`pizza-${index}`} index={index} {...menu} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Pizza, "pizza");
