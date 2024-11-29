//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;
  string public str;

  constructor(uint _x, string memory _str) {
    x = _x;
    str = _str;
  }

  function modifyToLeet() public {
    x = 1337;
  }

  function modifyString() public {
    str = 'Bomboclat';
  }

}