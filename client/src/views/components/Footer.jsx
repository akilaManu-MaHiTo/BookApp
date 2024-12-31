import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#ac753e] p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left Section - Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img src="readnest.png" alt="Bookstore Logo" className="h-16 md:h-24" />
          {/* <h2 className="text-xl md:text-2xl text-black font-bold mt-2">ReadNest</h2> */}
          <p className="text-white text-sm mt-2 text-center md:text-left">
            Your cozy nook for books and more.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-black">Quick Links</h3>
          <ul className="space-y-2 text-white">
            <li>
              <a href="#" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-black">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-white hover:text-black">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-black">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-black">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-gray-300 mt-6 pt-4">
        <p className="text-center text-gray-200 text-sm">
          © {new Date().getFullYear()} ReadNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
