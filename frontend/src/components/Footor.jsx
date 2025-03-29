import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-base-300 text-center py-6 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <p className="text-lg font-semibold">© 2025 Title Verification System. All Rights Reserved.</p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="text-primary text-xl hover:text-primary-focus transition">
            <FaFacebookF />
          </a>
          <a href="#" className="text-primary text-xl hover:text-primary-focus transition">
            <FaTwitter />
          </a>
          <a href="#" className="text-primary text-xl hover:text-primary-focus transition">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
