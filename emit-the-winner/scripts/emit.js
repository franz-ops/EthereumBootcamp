const { Contract } = require("ethers");
const { ethers } = require("ethers");

require("ethers")
require("dotenv")


async function main() {
    // testing revert (calling the function directly)
    /*abi = [
        {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[],"name":"attempt","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ];
        
    address = "0x1DEf0d3FF9aC88Ad8Cf106fDDba7aF520BF55908";

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(address, abi, provider);

    const contractwithSigner = contract.connect(wallet);

    const tx = await contractwithSigner.attempt();
    console.log("Transazione inviata:", tx.hash);
    */

    abi = [{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"callWinner","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        
    address = "0xD3d6C421713F840642a63F271580f5843F4F407C";

    targetAddress = "0x1DEf0d3FF9aC88Ad8Cf106fDDba7aF520BF55908";

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(address, abi, provider);

    const contractwithSigner = contract.connect(wallet);

    // calling Contract indirectly using callWinner
    const tx = await contractwithSigner.callWinner(targetAddress);
    console.log("Transazione inviata:", tx.hash);


}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});