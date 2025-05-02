import React from "react";
import { Card } from "flowbite-react";
import Tilt from "react-parallax-tilt";

const ServiceCard = ({ title, description, imgSrc }) => (
  <Tilt
    tiltMaxAngleX={20}
    tiltMaxAngleY={20}
    scale={1.05}
    transitionSpeed={400}
    className="w-full max-w-sm"
  >
    <div
      style={{ backgroundColor: '#211e1f' }}
      className="w-full bg-white shadow-lg overflow-hidden "
    >
      {/* Image Section - Placed at the Top */}
      <img
        src={imgSrc || "/images/default.jpg"}
        alt={`Image for ${title}`}
        className="w-full object-cover "
      />

      {/* Content Section */}
      <div className="p-6">
        <h5 className="text-2xl font-semibold text-white mb-3">{title}</h5>
        <p className="text-gray-100 text-base">{description}</p>
      </div>
    </div>
  </Tilt>
);

export default ServiceCard;
