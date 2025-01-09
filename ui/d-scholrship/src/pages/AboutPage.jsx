import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-teal-400">
          About OpenGrant
        </h1>

        <p className="text-gray-300 text-lg mb-6">
          OpenGrant is a revolutionary blockchain-based platform designed to
          provide decentralized and transparent scholarships for students
          worldwide. By leveraging the power of blockchain, we ensure fairness
          and security in every aspect of the grant process, from applications to
          fund distribution.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg">
            Our mission is to make educational funding accessible and equitable
            for students from all walks of life. By decentralizing scholarship
            management, we provide a transparent process where every step can be
            tracked, ensuring that students receive the grants they deserve.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">
            Why Choose OpenGrant?
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-4">
            <li>Decentralized, blockchain-powered platform for fairness and transparency.</li>
            <li>Global reach, enabling students from all countries to apply for grants.</li>
            <li>Efficient fund disbursement directly to student wallets, ensuring instant access.</li>
            <li>Secure and private — only the necessary information is collected, keeping student data safe.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
