import { Link } from "react-router-dom";
import { motion } from "motion/react"
import { FaCheckCircle, FaChartBar, FaClipboardList, FaUsers, FaRegQuestionCircle } from "react-icons/fa";
import Footer from "../../components/Footor";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[90vh] bg-gradient-to-r from-primary to-secondary text-white">
        <div className="hero-content text-center">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold">Verify Your Titles with Ease</h1>
            <p className="py-6 text-lg">Our AI-powered system checks title similarity instantly.</p>
            <Link to="/user/submit-title" className="btn btn-accent btn-lg">Submit a Title</Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {[ 
            { icon: FaClipboardList, title: "Submit a Title", desc: "Enter your title and submit it for verification." },
            { icon: FaChartBar, title: "Check Similarity", desc: "Our system compares your title with existing records." },
            { icon: FaCheckCircle, title: "Get Results", desc: "View similarity score and suggested alternatives." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="card bg-base-100 shadow-lg p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <item.icon className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-base-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[ 
            "This tool saved me hours of research!", 
            "Accurate and fast title verification system.", 
            "I love the suggested alternative titles feature!" 
          ].map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-base-200 p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FaUsers className="text-3xl text-secondary mx-auto mb-4" />
              <p className="text-gray-700">"{testimonial}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {[ 
            { question: "How does the title verification work?", answer: "Our system compares submitted titles with a database of existing ones." },
            { question: "Is it free to use?", answer: "Yes, the basic version is completely free." }
          ].map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-base-100 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaRegQuestionCircle className="text-primary" /> {faq.question}
              </h3>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-secondary to-primary text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Get Started Now</h2>
        <p className="text-lg mt-4">Start verifying your titles with AI-powered accuracy.</p>
        <Link to="/user/submit-title" className="btn btn-accent btn-lg mt-6">Submit a Title</Link>
      </div>
    </div>
  );
};

export default Home;
