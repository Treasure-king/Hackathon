import { Link } from "react-router-dom";
import Footer from "../../components/Footor";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200">

      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-primary">Verify Your Titles with Ease</h1>
            <p className="py-6 text-lg">
              Our system helps you automatically check new title submissions for similarity with existing ones.
            </p>
            <Link to="/submit-title" className="btn btn-primary btn-lg">Submit a Title</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold">1. Submit a Title</h3>
            <p className="text-sm">Enter your title and submit it for verification.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold">2. Check Similarity</h3>
            <p className="text-sm">Our system compares your title with existing records.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold">3. Get Results</h3>
            <p className="text-sm">View similarity score and suggested alternatives.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
