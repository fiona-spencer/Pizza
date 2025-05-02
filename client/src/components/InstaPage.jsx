import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { instaImages } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
const InstaPage = ({ images }) => {
  const galleryRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    galleryRef.current.touchStart = touchStart;
  };

  const handleTouchMove = (e) => {
    const touchMove = e.touches[0].clientX;
    const touchStart = galleryRef.current.touchStart;
    const diff = touchStart - touchMove;

    setScrollX((prevScrollX) => prevScrollX + diff);
    galleryRef.current.scrollLeft = galleryRef.current.scrollLeft + diff;

    galleryRef.current.touchStart = touchMove;
  };

  return (
    <section className="py-10 bg-red-500">
      <div className="pl-10 mb-6">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-red-700`}>Social</p>
        <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
  <h2 className={`${styles.sectionHeadText}`}>
    INSTAGRAM
  </h2>
</a>
        </motion.div>
      </div>

      <div className="relative px-4 sm:px-10 overflow-hidden">
  {/* Left Gradient */}
  <div className="absolute top-0 left-0 h-full w-12 sm:w-24 bg-gradient-to-r from-red-500 via-red-500/40 to-transparent z-10 pointer-events-none" />
  {/* Right Gradient */}
  <div className="absolute top-0 right-0 h-full w-12 sm:w-24 bg-gradient-to-l from-red-500 via-red-500/40 to-transparent z-10 pointer-events-none" />


        <div
  ref={galleryRef}
  className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scrollbar-none"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
>
  {[...instaImages, ...instaImages].map((img, index) => (
    <motion.img
      key={index}
      src={img}
      alt={`Insta ${index}`}
      className="rounded-lg w-40 h-40 sm:w-52 sm:h-52 object-cover shrink-0"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    />
  ))}
</div>

      </div>
    </section>
  );
};

export default InstaPage;
