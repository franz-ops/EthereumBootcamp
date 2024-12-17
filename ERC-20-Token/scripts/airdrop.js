const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");

require("ethers");
require("dotenv").config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);

    const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

    const artifacts = await hre.artifacts.readArtifact("GoofyGoober");

    const contract = new ethers.Contract("Insert the contract address deploys", artifacts.abi, artifacts.bytecode, wallet);

    const contractWithSigner = contract.connect(wallet);

    // airdrop 10GG token to the recipient
    let recipients = ["recipient address"];
    let amount = ethers.parseUnits("10", 18);

    for (let i = 0; i < recipients.length; i++){
        try {
            const tx = await contractWithSigner.transfer(recipients[i], amount);
            console.log(`Transaction sent: ${tx.hash}`);
            await tx.wait(); // Aspetta che la transazione venga confermata
            console.log(`Transaction confirmed: ${tx.hash}`);           
        }
        catch (error) {
            console.error(`Failed to send tokens to ${recipients[i]}:`, error);
        }
    }
  }

  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });
