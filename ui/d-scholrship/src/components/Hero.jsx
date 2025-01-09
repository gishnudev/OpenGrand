import React from "react";
import { ReactTyped } from "react-typed";
import {ethers} from 'ethers'
import Metamask from '../assets/video/45c4d5bde98b47998b22ee008146eab8.webm'
import { useNavigate } from 'react-router-dom';
import deployedAddress from '../assets/deployed_addresses.json'
import ABI from '../assets/OpenGrant.json'
import DownwardIndicator from "../assets/jsfiles/DownwardIndicator";


const Hero = () => {

  const navigate = useNavigate()

  async function connectMetamask() {

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer =await provider.getSigner()
    const cAbi = ABI.abi;
    const cAddress = deployedAddress["GrantModule#OpenGrant"]
    const contractInstance = new ethers.Contract(cAddress,cAbi,signer)

    const Admin = await contractInstance.admin();
    console.log(Admin);

    if(Admin === signer.address){
      navigate('/AdDash')
    }else{
      navigate('/AppDash')
    }
   
    
  }
  return (
    <div className="relative text-white h-screen ">
      <div className="max-w-[1500px] w-full h-screen mx-auto text-center flex flex-col justify-center px-4">
        <p className="text-[#00df9a] font-bold text-lg md:text-xl p-2 uppercase">
          Empowering Education Through Decentralization
        </p>
        
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold md:py-4">
          Transparent and Fair Scholarships
        </h1>
        
        <div className="py-4">
          <p className="md:text-3xl sm:text-2xl text-xl font-semibold inline ">
            Join the future of funding education:
          </p>
          <ReactTyped
            className="md:text-3xl sm:text-2xl text-xl font-semibold pl-2 text-gray-600"
            strings={[
              "Empower Students Globally",
              "Blockchain for Fairness",
              "Your Dreams, Decentralized",
            ]}
            typeSpeed={100}
            backSpeed={80}
            loop
            aria-label="Dynamic phrases about the benefits of OpenGrant."
          >
           </ReactTyped>
        </div >
        <div className="flex justify-center	">
        <video width="200" autoPlay muted loop >
            <source src={Metamask} type="video/webm" />
          </video>
        </div>
        <button onClick={connectMetamask} className=" mt-6 px-8 py-3 self-center  bg-teal-400 text-black font-bold rounded-lg hover:bg-teal-500 transition duration-300">
          Connect with MetaMask
        </button>
        <DownwardIndicator/>
        
      </div>
    </div>
  );
};

export default Hero;
