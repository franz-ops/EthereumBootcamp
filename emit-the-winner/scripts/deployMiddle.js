const { Wallet, ethers } = require("ethers")

require("dotenv")
require("ethers")


async function main() {

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY,provider);

    let artifacts = await hre.artifacts.readArtifact("MiddleContract");

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

    let contract = await factory.deploy();

    await contract.waitForDeployment();

    console.log("Contract address: ", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});