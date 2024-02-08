// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherTransfer {
    // Function to receive Ether
    receive() external payable {}
    
    // Function to transfer 1 ether to the contract address
    function transferOneEtherToContract() external payable {
        require(msg.value == 1 ether, "Please send exactly 1 ether");
        // No need to do anything else since the Ether is already transferred to the contract address
    }
}
