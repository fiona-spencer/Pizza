import React from "react";

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.0092374738283!2d-79.29901642394063!3d43.68957135007787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd01b5316fad%3A0x67bfa40541579f44!2sHooray%20for%20Pizza%20Day!5e0!3m2!1sen!2sca!4v1722701383254!5m2!1sen!2sca"
        style={{
          border: 0,
          width: "100%",
          height: "150%",
          filter: "",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;