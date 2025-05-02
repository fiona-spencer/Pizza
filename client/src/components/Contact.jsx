import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Alert } from "flowbite-react";
import { IoIosSend } from "react-icons/io";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import PizzaCanvas from "./canvas/Pizza";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ show: false, success: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setForm({ name: "", email: "", message: "" });
        setAlert({
          show: true,
          success: true,
          message: "Message sent successfully!",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setAlert({
          show: true,
          success: false,
          message: "Something went wrong. Please try again.",
        });
      });

    setTimeout(() => {
      setAlert({ show: false, success: false, message: "" });
    }, 5000);
  };

  return (
<div>
<div className="md:pt-10">
<p className={`${styles.sectionSubText} px-4`}>Get in touch</p>
<h3 className={`${styles.sectionHeadText} px-4 pb-2`}>Contact</h3>
</div>
<div className="xl:mt-10 flex flex-col sm:flex-row overflow-hidden">

<motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] max-w-xl border-dashed border-4 border-slate-900 p-8 squared-2xl bg-[#8d262664]"
      >
     
        {alert.show && (
          <Alert
            color={alert.success ? "success" : "failure"}
            className="mb-4"
          >
            <span className="font-medium">{alert.message}</span>
          </Alert>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-2 flex flex-col gap-7"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 text-sm sm:text-base">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-slate-800 py-4 px-6 placeholder:text-secondary text-white text-sm sm:text-base rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 text-sm sm:text-base">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-slate-800 py-4 px-6 placeholder:text-secondary text-white text-sm sm:text-base rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 text-sm sm:text-base">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-slate-800 py-4 px-6 placeholder:text-secondary text-white text-sm sm:text-base rounded-lg outline-none border-none font-medium"
            />
          </label>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition-all duration-200 flex items-center"
            >
              {loading ? "Sending..." : "Send"}
              <IoIosSend className="h-5 w-5 ml-3" />
            </motion.button>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <PizzaCanvas />
      </motion.div>
    </div>
</div>
  );
};

export default SectionWrapper(Contact, "contact");
