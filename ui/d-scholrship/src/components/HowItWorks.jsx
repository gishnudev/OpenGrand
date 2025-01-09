import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full bg-black py-16 px-4">
      <div className="max-w-[1240px] mx-auto text-center ">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 ">
          How It Works
        </h2>
        <p className="text-gray-600 mt-4 mb-8">
          Follow these simple steps to apply for a scholarship on OpenGrant.
        </p>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 text-left ">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg shadow-teal-700">
            <div className="text-teal-600 text-3xl font-bold mb-4">1</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Explore Scholarships</h3>
            <p className="text-gray-600">
              Cheks scholarships the match your profile.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg shadow-teal-700">
            <div className="text-teal-600 text-3xl font-bold mb-4">2</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Submit Application</h3>
            <p className="text-gray-600">
              Fill out the required details and upload documents securely.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg shadow-teal-700">
            <div className="text-teal-600 text-3xl font-bold mb-4">3</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Receive Funds</h3>
            <p className="text-gray-600">
              Once approved, receive funds directly and securely via blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
