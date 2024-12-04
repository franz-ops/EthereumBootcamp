const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require("hardhat");


describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy({value: ethers.parseUnits("0.5", "ether")});

    await faucet.waitForDeployment();

    const [owner, nonowner] = await ethers.getSigners();

    const provider = ethers.provider;
    
    let withdrawAmount = ethers.parseUnits("0.2", "ether");

    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount, nonowner, provider };
  }


  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawing more than .1 ETH', async function () {
    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.withdraw(withdrawAmount))
    .to.be.revertedWith("amount not sendable");
  });

  it('should only be called by the owner', async function () {
    const { faucet, nonowner } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.connect(nonowner).withdrawAll())
    .to.be.revertedWith("only owner can call");
  });

  it("should emit an event when the contract is destroyed", async () => {
    
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.destroyFaucet())
        .to.emit(faucet, "ContractDestroyed")
        .withArgs(owner.address);
  }); 

  it('should self destroy', async function () {
    const { faucet, owner, provider } = await loadFixture(deployContractAndSetVariables);

    // Verifica che il contratto esista inizialmente
    const codeBefore = await provider.getCode(await faucet.getAddress());
    await expect(codeBefore).to.not.equal("0x");

    
    // Chiama la funzione destroyFaucet
    const tx = await faucet.connect(owner).destroyFaucet();
    await tx.wait();
    
    const codeAfter = await provider.getCode(await faucet.getAddress());
    expect(codeAfter).to.equal("0x");
  });

  it('should send contract\'s  balance to owner', async function () {
    const { faucet, provider } = await loadFixture(deployContractAndSetVariables);

    // Chiama la funzione destroyFaucet
    const tx = await faucet.destroyFaucet();
    //console.log("Transaction Sent:", tx);
    const receipt = await tx.wait();
    //console.log(receipt); // Aspetta che la transazione venga minata

    const balance = await provider.getBalance(faucet.getAddress());
    await expect(balance).to.be.equal(0);
  });

});