import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiSend } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed bottom-4 right-4 w-fit p-3 shadow-lg animate-bounce`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 3) newErrors.name = "Must be at least 3 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10) newErrors.message = "Must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Form Submitted:", formData);
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
      }, 2000);
    } else {
      showToast("Please fix errors before submitting!", "error");
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-12 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Contact Us</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Have questions? Feel free to reach out using the form below.
      </p>

      <motion.div
        className="max-w-lg mx-auto bg-base-100 shadow-xl p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>

          {/* Name Input */}
          <motion.div 
            className="form-control mb-4" 
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
          >
            <label className="label flex items-center gap-2">
              <FiUser className="text-lg text-primary" />
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`input input-bordered w-full ${errors.name ? "input-error shake" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
          </motion.div>

          {/* Email Input */}
          <motion.div 
            className="form-control mb-4" 
            initial={{ x: 30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
          >
            <label className="label flex items-center gap-2">
              <FiMail className="text-lg text-primary" />
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full ${errors.email ? "input-error shake" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </motion.div>

          {/* Message Input */}
          <motion.div 
            className="form-control mb-4" 
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.4 }}
          >
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              name="message"
              placeholder="Enter your message"
              className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error shake" : ""}`}
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="text-error text-sm mt-1">{errors.message}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Sending..." : <>Send Message <FiSend /></>}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
