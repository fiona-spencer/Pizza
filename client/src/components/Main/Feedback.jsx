import { motion } from "framer-motion";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import { testimonials } from "../../constants";
import { Avatar } from "flowbite-react";
import { useRef } from "react";

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
<motion.div
  variants={fadeIn("", "spring", index * 0.5, 0.75)}
  className="bg-red-500 min-w-[12rem] max-w-[20rem] p-3 flex flex-col justify-between text-white"
>
  <p className="text-xl font-black leading-none mb-2">“</p>

  {/* This paragraph will wrap long text instead of truncating */}
  <p className="text-sm leading-snug break-words whitespace-normal mb-4">
    {testimonial}
  </p>

  <div className="flex items-center gap-2 mt-auto">
    <Avatar
      img={image}
      rounded
      alt={`Photo of ${name}`}
      className="w-10 h-8"
    />
    <div className="text-xs leading-tight">
      <p className="font-semibold">{name}</p>
      <p className="text-[0.6rem] opacity-80">{designation}</p>
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
    <div className="bg-white-100 -mt-20 z-10">
      {/* Header */}
      <div className={`${styles.padding} flex flex-col justify-center`}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-gray-400`}>most recent</p>
          <h2 className={styles.sectionHeadText}>Reviews</h2>
        </motion.div>
      </div>

      {/* Scrollable Feedback Cards */}
      <div className="z-10 px-6 sm:px-10 -mt-6 overflow-hidden">
        {/* Left Blur */}
        <div className="absolute top-0 left-0 h-48 w-12 sm:w-24 bg-gradient-to-r from-[#272524ca] via-red/80 to-transparent z-10 pointer-events-none" />

        {/* Right Blur */}
        <div className="absolute top-0 right-0 h-48 w-12 sm:w-24 bg-gradient-to-l from-[#272524ca] via-red/80 to-transparent z-10 pointer-events-none" />

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
