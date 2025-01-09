import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-teal-400">OpenGrant</h3>
          <p className="mt-4 text-gray-400">
            OpenGrant ensures transparency and fairness in scholarship distribution, empowering students worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-teal-400">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-teal-200">Home</a></li>
            <li><a href="/AboutPage" className="hover:text-teal-200">About</a></li>
            <li><a href="#how-it-works" className="hover:text-teal-200">How It Works</a></li>
            <li><a href="/Contact" className="hover:text-teal-200">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold text-teal-400">Support</h4>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="#faq" className="hover:text-teal-200">FAQs</a></li>
            <li><a href="#support" className="hover:text-teal-200">Help Center</a></li>
            <li><a href="#privacy" className="hover:text-teal-200">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-teal-200">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold text-teal-400">Contact</h4>
          <p className="mt-4 text-gray-400">jishnudevadathan1998@gmail.com</p>
          <p className="mt-2 text-gray-400">+1 123-456-7890</p>
          <div className="flex space-x-4 mt-4">
            <a href="#facebook" className="hover:text-teal-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#twitter" className="hover:text-teal-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#linkedin" className="hover:text-teal-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        <p>© 2024 OpenGrant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
