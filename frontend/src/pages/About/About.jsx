import { motion } from "framer-motion";
import { FaSearch, FaBolt, FaChartPie, FaLock } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* About Content */}
      <motion.div 
        className="container mx-auto py-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-center text-primary mb-6">About Our System</h1>
        <p className="text-lg text-center max-w-2xl mx-auto text-gray-700">
          Our Title Verification System is designed to help users check for similarities
          in new title submissions. Using advanced algorithms, we compare your titles with
          existing records and provide suggestions to avoid duplication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Card 1 */}
          <motion.div 
            className="card bg-base-100 shadow-xl p-6 flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaSearch className="text-primary text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Accurate Matching</h2>
              <p className="text-gray-600">We use advanced text similarity algorithms to detect matching titles.</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="card bg-base-100 shadow-xl p-6 flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaBolt className="text-secondary text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Fast & Efficient</h2>
              <p className="text-gray-600">Get instant feedback on your title submissions with real-time processing.</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="card bg-base-100 shadow-xl p-6 flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaChartPie className="text-accent text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Detailed Reports</h2>
              <p className="text-gray-600">View similarity scores and suggestions for alternative titles.</p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            className="card bg-base-100 shadow-xl p-6 flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaLock className="text-error text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Secure & Reliable</h2>
              <p className="text-gray-600">Your data is safe with us, and we ensure high accuracy in verification.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
