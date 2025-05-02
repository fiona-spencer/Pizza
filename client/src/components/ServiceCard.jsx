import React from "react";
import Tilt from "react-parallax-tilt";

const ServiceCard = ({ title, description, imgSrc, link }) => (
  <Tilt
    tiltMaxAngleX={20}
    tiltMaxAngleY={20}
    scale={1.05}
    transitionSpeed={400}
    className="w-full max-w-sm"
  >
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        style={{ backgroundColor: '#211e1f' }}
        className="sm:w-fit shadow-lg overflow-hidden"
      >
        <img
          src={imgSrc || "/images/default.jpg"}
          alt={`Image for ${title}`}
          className="w-full object-cover"
        />
        <div className="p-4">
          <h5 className="text-2xl font-semibold text-white">{title}</h5>
          <p className="text-gray-100 text-base">{description}</p>
        </div>
      </div>
    </a>
  </Tilt>
);

export default ServiceCard;
