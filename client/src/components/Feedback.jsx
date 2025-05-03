import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { Avatar } from "flowbite-react";
import { useRef } from "react";

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-red-500 p-4 sm:p-6 md:p-6 w-full text-sm sm:text-base h-40"
  >
    <p className="text-white font-black text-3xl">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wide text-sm">{testimonial}</p>

      <div className="mt-4 flex items-center gap-3">
        <Avatar
          img={image}
          rounded
          alt={`Photo of ${name}`}
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
        <div className="flex flex-col">
          <p className="text-white font-medium text-sm">{name}</p>
          <p className="text-white text-xs">
            {designation} at {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedback = () => {
  const reviewsRef = useRef(null);

  const handleTouchStart = (e) => {
    reviewsRef.current.touchStart = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchMove = e.touches[0].clientX;
    const touchStart = reviewsRef.current.touchStart;
    const diff = touchStart - touchMove;

    reviewsRef.current.scrollLeft += diff; // Direct scroll
    reviewsRef.current.touchStart = touchMove; // Update touch reference
  };

  return (
    <div className="bg-white-100 -mt-20">
      {/* Header */}
      <div className={`${styles.padding} flex flex-col justify-center`}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-gray-400`}>most recent</p>
          <h2 className={styles.sectionHeadText}>Reviews</h2>
        </motion.div>
      </div>

      {/* Scrollable Feedback Cards */}
      <div className="relative px-6 sm:px-10 -mt-6 overflow-hidden">
        {/* Left Blur */}
        <div className="absolute top-0 left-0 h-40 w-12 sm:w-24 bg-gradient-to-r from-red-300 via-white/20 to-transparent z-10 pointer-events-none" />

        {/* Right Blur */}
        <div className="absolute top-0 right-0 h-40 w-12 sm:w-24 bg-gradient-to-l from-red-300 via-white/20 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={reviewsRef}
          className="scroll-x-animate flex gap-6 overflow-x-auto whitespace-nowrap scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <FeedbackCard key={index} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedback, "feedback");
