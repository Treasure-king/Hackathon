

const About = () => {
  return (
    <div className="min-h-screen bg-base-200">

      {/* About Content */}
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-6">About Our System</h1>
        <p className="text-lg text-center max-w-2xl mx-auto">
          Our Title Verification System is designed to help users check for similarities 
          in new title submissions. Using advanced algorithms, we compare your titles with 
          existing records and provide suggestions to avoid duplication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-2xl font-semibold">🔍 Accurate Matching</h2>
            <p>We use advanced text similarity algorithms to detect matching titles.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-2xl font-semibold">⚡ Fast & Efficient</h2>
            <p>Get instant feedback on your title submissions with real-time processing.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-2xl font-semibold">📊 Detailed Reports</h2>
            <p>View similarity scores and suggestions for alternative titles.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-2xl font-semibold">🔒 Secure & Reliable</h2>
            <p>Your data is safe with us, and we ensure high accuracy in verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
