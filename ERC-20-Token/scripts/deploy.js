const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");

require("ethers");
require("dotenv").config();

async function main() {

    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);

    const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

    const artifacts = await hre.artifacts.readArtifact("GoofyGoober");

    const factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode,wallet);

    const contract = await factory.deploy();

    await contract.waitForDeployment();

    console.log("Contract address: ", await contract.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });
