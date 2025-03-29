import { useState } from "react";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Error state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show toast function
  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed bottom-4 right-4 w-fit p-3 shadow-lg`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Form Submitted:", formData);
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setIsSubmitting(false);
      }, 2000);
    } else {
      showToast("Please fix errors before submitting!", "error");
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Contact Us</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Have questions? Feel free to reach out to us using the form below.
      </p>

      {/* Contact Form */}
      <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              name="message"
              placeholder="Enter your message"
              className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="text-error text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
