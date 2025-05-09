import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { motion } from "framer-motion";
import PizzaItem from "../Modal/PizzaItem";
import { pizzas } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { FaLeaf } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";

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
          className="text-[17px] lg:text-xl max-w-5xl pb-8 pt-4 text-red-900 p-2"
        >
          Our famous 48-hour fermented dough is always baked fresh to order. All pies are 8x10.
        </motion.p>
        
        {/* Vegan/Vegetarian Icons */}
        <div className="flex flex-col sm:inline sm:items-center gap-2 sm:gap-4 mb-6 sm:space-y-4 sm:pl-20">
  {/* Vegetarian Legend */}
  <div className="flex items-center space-x-1 sm:space-2 ">
    <div className="bg-green-500 p-1 rounded-sm">
      <FaLeaf className="w-5 h-5 md:w-7 md:h-7 text-white" />
    </div>
    <span className="text-xs sm:text-sm md:text-md font-bold text-gray-700 pl-1">Vegetarian</span>
  </div>

  {/* Vegan Legend */}
  <div className="flex items-center space-x-1 sm:space-x-2">
    <div className="bg-blue-500 p-1 rounded-sm">
      <LuVegan className="w-5 h-5 md:w-7 md:h-7 text-white" />
    </div>
    <span className="text-xs sm:text-sm md:text-md font-bold text-gray-700 pl-1">Vegan</span>
  </div>
</div>

      </div>

      {/* Pizza Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {pizzas.map((menu, index) => (
          <PizzaItem key={`pizza-${index}`} index={index} {...menu} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Pizza, "pizza");
