const { ethers } = require('hardhat');

require('ethers')
require('dotenv')


async function main() {

    // contract address
    const contractAddr = '0xb0BF268b049139509a65629c429A0BeD8DB8ee4D';

    const contractABI = [
        {"inputs":[{"internalType":"uint256","name":"_x","type":"uint256"},{"internalType":"string","name":"_str","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"modifyString","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"modifyToLeet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"str","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"x","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
    ]

    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(contractAddr, contractABI, provider);

    console.log(await contract.str())


    const contractWithSigner = contract.connect(wallet);

    const tx = await contractWithSigner.modifyString();
    console.log("Transazione inviata:", tx.hash);

    console.log(await contract.str())

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});