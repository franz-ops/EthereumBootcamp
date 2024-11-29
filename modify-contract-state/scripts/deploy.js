const { Contract } = require('ethers');
const { ethers } = require('hardhat')

require('ethers')
require('dotenv')

async function main() {

    // GET PK
    const privateKey = process.env.TESTNET_PRIVATE_KEY

    // READ CONTRACT .SOL  || NEED TO GET ABI AND BYTECODE INFO
    let artifacts = await hre.artifacts.readArtifact("ModifyVariable")

    // GET PROVIDER
    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    // SET WALLET BY PK-PROVIDER
    wallet = new ethers.Wallet(privateKey, provider);

    // CREATE INSTANCE CONTRACT

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet)

    let ModifyVariable = await factory.deploy(10, "InitialD");

    await ModifyVariable.deployed();

    console.log("contract address:", ModifyVariable.address)
    
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});