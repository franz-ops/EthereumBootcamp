// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Contract {
    function attempt() external;    
}

contract MiddleContract {

    function callWinner(address addr) external {
        Contract(addr).attempt();
    }
}