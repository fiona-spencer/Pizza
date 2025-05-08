import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Alert } from "flowbite-react";
import { IoIosSend } from "react-icons/io";

import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import PizzaCanvas from "../canvas/Pizza";
import { ContactEmailTemp } from "../../../../api/utils/contactEmailTemp";


const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ message: "", isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, success: false, message: "" });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: "", isError: false });

    const { name, email, message } = formData;

    const mailPayload = {
      from: `"${name}" <${email}>`,
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: ContactEmailTemp({ name, email, message }),
    };

    try {
      const res = await fetch("/api/email/sendContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mailPayload),
      });

      const data = await res.json();
      console.log("Response from server:", data);

      if (!res.ok) throw new Error(data.message || "Failed to send message");

      setFormStatus({ message: "Your message has been sent successfully!", isError: false });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus({ message: error.message, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:pt-10 -mt-9">
      <p className={`${styles.sectionSubText} px-4`}>Get in touch</p>
      <h3 className={`${styles.sectionHeadText} px-4 pb-2`}>Contact</h3>

      <div className="xl:mt-10 flex flex-col sm:flex-row overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] md:max-w-xl lg:max-w-4xl border-dashed border-4 border-slate-900 p-8 squared-2xl bg-[#8d262664]"
        >
          {alert.show && (
            <Alert color={alert.success ? "success" : "failure"} className="mb-4">
              <span className="font-medium">{alert.message}</span>
            </Alert>
          )}

          <form ref={formRef} onSubmit={handleFormSubmit} className="mt-2 flex flex-col gap-7">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4 text-sm sm:text-base">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="What's your name?"
                className="bg-slate-800 py-4 px-6 placeholder:text-secondary text-white text-sm sm:text-base rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4 text-sm sm:text-base">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="What's your email?"
                className="bg-slate-800 py-4 px-6 placeholder:text-secondary text-white text-sm sm:text-base rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4 text-sm sm:text-base">Message</span>
              <textarea
                rows={7}
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="What do you want to say?"
                className="bg-slate-800 py-4 px-6 placeholder:text-secondary text-white text-sm sm:text-base rounded-lg outline-none border-none font-medium"
              />
            </label>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-slate-800 z-10 hover:bg-slate-700 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition-all duration-200 flex items-center"
              >
                {isSubmitting ? "Sending..." : "Send"}
                <IoIosSend className="h-5 w-5 ml-3" />
              </motion.button>
            </div>
          </form>

          {formStatus.message && (
            <p className={`mt-4 text-center ${formStatus.isError ? "text-red-300" : "text-white font-bold"}`}>
              {formStatus.message}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] lg:pl-40 z-0"
        >
          <PizzaCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
