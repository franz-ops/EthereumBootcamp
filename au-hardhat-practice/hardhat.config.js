require('dotenv').config()

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: ALCHEMY_RPC_URL,
      accounts: TESTNET_PRIVATE_KEY
    }
  }
};
