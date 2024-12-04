// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Faucet {
  address payable public owner;

  event ContractDestroyed(address by);

  constructor() payable {
    owner = payable(msg.sender);
  }
  
  function withdraw(uint _amount) payable public {
    // users can only withdraw .1 ETH at a time, feel free to change this!
    require(_amount <= 100000000000000000, "amount not sendable");
    (bool sent, ) = payable(msg.sender).call{value: _amount}("");
    require(sent, "Failed to send Ether");
  }

  function withdrawAll() onlyOwner public {
    (bool sent, ) = owner.call{value: address(this).balance}("");
    require(sent, "Failed to send Ether");
  }

  function destroyFaucet() onlyOwner public {
    emit ContractDestroyed(msg.sender);
    selfdestruct(payable(owner));
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "only owner can call");
    _;
  }
}