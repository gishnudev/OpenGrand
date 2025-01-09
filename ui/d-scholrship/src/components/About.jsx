import React from "react";
import Bg from "../assets/video/bg2.mp4"

const About = () => {
  return (
    <div className="relative text w-full py-16 px-4 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full object-cover bg-black opacity-50 -z-10"
        autoPlay
        muted
        loop
      >
        <source src={Bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <div className="relative max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center text-white">
        {/* Left Section: Content */}
        <div>
          <h2 className="text-xl md:text-xl font-bold text-[#00df9a] uppercase">
            Why Choose OpenGrant?
          </h2>
          <p className="text-gray-200 mt-4 text-lg">
            OpenGrant is a decentralized platform that revolutionizes how
            scholarships are distributed. By leveraging blockchain technology,
            we ensure complete transparency, fairness, and security in every
            transaction.
          </p>
        </div>

        {/* Right Section: Image */}
        <div className="flex justify-center">
          <img
            src="/src/assets/images/student.jpg"
            alt="Students applying for scholarships"
            className="rounded-lg shadow-lg w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
