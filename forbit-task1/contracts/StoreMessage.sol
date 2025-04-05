// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageStorage {
    string[] private messages;

    constructor(string memory initialMessage) {
        messages.push(initialMessage);
    }

    function addMessage(string memory newMessage) public {
        messages.push(newMessage);
    }

    function getMessage(uint index) public view returns(string memory) {
        require(index < messages.length, "Index out of bounds");
        return messages[index];
    }

    function getAllMessages() public view returns(string[] memory) {
        return messages;
    }

    function getMessageCount() public view returns(uint) {
        return messages.length;
    }
}