require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "localhost",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // },
    sepolia: {
      url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.api_key}`,
      accounts:[process.env.private_key]
    }
  },
  solidity: "0.8.20",
};