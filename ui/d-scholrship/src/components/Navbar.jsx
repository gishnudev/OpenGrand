import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-between text-white items-center h-24 max-w-[1240px] mx-auto px-4">
        <img src="/src/assets/images/logo-transparent-svg.svg" alt="" width={100}/>
        <h1 className="text-teal-400 w-full font-bold text-3xl"><Link href="/">OpenGrant</Link></h1>
        <ul className="hidden md:flex ">
          <li className="p-4 hover:text-teal-200"><Link to="/"> Home</Link></li>
          <li className="p-4 hover:text-teal-200"><Link to="/AboutPage">About</Link></li>
          <li className="p-4 hover:text-teal-200"><Link to="/Contact">Contact</Link></li>
        </ul>

        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <div
          className={`fixed left-0 top-0 h-full w-[60%] border-r border-gray-900 bg-[#000300] text-[#00df9a] ease-in-out duration-500 ${
            nav ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          <h1 className="text-teal-400 w-full h-20 font-bold text-3xl p-4">
            OpenGrant
          </h1>
          <ul className="pt-4 uppercase">
            <Link className="p-4 border-b border-gray-600">Home</Link>
            <Link className="p-4 border-b border-gray-600">About</Link>
            <Link className="p-4">Contact</Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
