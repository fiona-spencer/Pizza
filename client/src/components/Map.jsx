import React from "react";
import { styles } from "../styles";
import pizzaIconBg from "../assets/pizza_icon.svg";

const Map = () => {
  return (
    <section className="relative w-full px-4 py-12 text-white overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={pizzaIconBg}
          alt="Pizza Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center">
        <p className={`${styles.sectionSubText} text-black`}>find us on</p>
        <h2 className={`${styles.sectionHeadText}`}>Google Map</h2>
      </div>

      <div className="relative z-10 sm:flex sm:grid-flow-col mx-auto sm:px-48 sm:gap-9 items-center">
        {/* Info Section */}
        <div className="my-6 max-w-3xl mx-auto text-center bg-[#6b202097] p-4 sm:p-10 border-2 border-white rounded sm:flex-1 text-sm sm:text-base">
          <p className="font-semibold">Address:</p>
          <p className="mb-4">
            <a
              href="https://www.google.com/maps/place/2800+Danforth+Ave,+Toronto,+ON+M4C+1M1"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              2800 Danforth Ave, Toronto, ON M4C 1M1
            </a>
          </p>
          <p className="font-semibold">Phone:</p>
          <p className="mb-4">
            <a href="tel:+14165516540" className="underline hover:text-gray-300">
              (416) 551-6540
            </a>
          </p>
          <p className="font-semibold">Hours:</p>
          <ul className="space-y-1 mt-2">
            <li>Friday: <span className="font-semibold">5:30–10 p.m.</span></li>
            <li>Saturday: <span className="font-semibold">5:30–10 p.m.</span></li>
            <li>Sunday: <span className="font-semibold">6–10 p.m.</span></li>
            <li>Monday: <span className="font-semibold">Closed</span></li>
            <li>Tuesday: <span className="font-semibold">Closed</span></li>
            <li>Wednesday: <span className="font-semibold">6–10 p.m.</span></li>
            <li>Thursday: <span className="font-semibold">6–10 p.m.</span></li>
          </ul>
        </div>

        {/* Map Embed */}
        <div className="overflow-hidden rounded-lg shadow-lg max-w-5xl mx-auto sm:h-[450px] h-96 border-white border-4 sm:flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.0092374738283!2d-79.29901642394063!3d43.68957135007787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd01b5316fad%3A0x67bfa40541579f44!2sHooray%20for%20Pizza%20Day!5e0!3m2!1sen!2sca!4v1722701383254!5m2!1sen!2sca"
            style={{ border: 0 }}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
