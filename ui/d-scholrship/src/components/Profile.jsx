import React from 'react'

const Profile = () => {
  return (
    <div className=" text-white px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          About the OpenGrant
        </h2>

        <p className="text-gray-300 text-lg text-center mb-8">
          OpenGrant revolutionizes scholarships by leveraging blockchain technology 
          to ensure fairness, transparency, and global accessibility for students worldwide.
        </p>

        {/* Application Details Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">Grant Application Details</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>
              <strong>Eligibility:</strong> Students with valid qualifications and proof of identity from any background.
            </li>
            <li>
              <strong>Required Information:</strong> Name, age, qualification, passing year, grades, percentage, and supporting documents like transcripts or certificates.
            </li>
            <li>
              <strong>Approval Process:</strong> Applications are reviewed by administrators, and approved applicants receive their grant directly in cryptocurrency.
            </li>
          </ul>
        </div>

       
        {/* How to Apply Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">How to Apply</h3>
          <p className="text-gray-300 mb-6">
            Follow these simple steps to apply for the OpenGrant scholarship:
          </p>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>1. Connect your wallet via MetaMask.</p>
            <p>2. Fill out the application form on the OpenGrant platform.</p>
            <p>3. Upload required documents and submit.</p>
            <p>4. Track the status of your application via the "Application Status" feature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile