const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const funder = ethers.getSigner(0);

    let wallet;

    //creo wallet random finche non trovo un wallet con meno valore binario inferiore a quello specificato nello smart contract
    do {
      wallet = ethers.Wallet.createRandom();
    }
    while( ethers.utils.arrayify((await wallet.getAddress()).toString()).slice(0, 20)  > ethers.utils.arrayify('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf').slice(0, 20) )
    
    //confronto i due array
    //console.log( ethers.utils.arrayify((await wallet.getAddress()).toString()).slice(0, 20) );
    //console.log( ethers.utils.arrayify('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf').slice(0, 20) );

    //invio dei fondi al wallet trovato per poter fare le txs
    const tx = (await funder).sendTransaction({
      to: wallet.address, // Indirizzo del nuovo wallet
      value: ethers.utils.parseEther("1.0"), // Ammontare da trasferire (es. 1 ETH)
    });

    //creo un signer sulla base del wallet trovato
    const signer = wallet.connect(ethers.provider);

    return { game, signer };
  }
  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // good luck

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
