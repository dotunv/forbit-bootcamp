// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CIDStorage
 * @dev A smart contract for storing and retrieving Filecoin CIDs
 */
contract CIDStorage {
    // Struct to store CID with metadata
    struct CIDEntry {
        string cid;
        string description;
        uint256 timestamp;
        address uploader;
    }

    // Array to store all CID entries
    CIDEntry[] private cidEntries;
    
    // Mapping to track if an address has uploaded a CID
    mapping(address => bool) private hasUploaded;
    
    // Event emitted when a new CID is stored
    event CIDStored(
        string indexed cid,
        string description,
        uint256 timestamp,
        address indexed uploader
    );

    /**
     * @dev Store a new CID with description
     * @param _cid The Content Identifier to store
     * @param _description A description of the stored content
     */
    function storeCID(string memory _cid, string memory _description) public {
        require(bytes(_cid).length > 0, "CID cannot be empty");
        
        CIDEntry memory newEntry = CIDEntry({
            cid: _cid,
            description: _description,
            timestamp: block.timestamp,
            uploader: msg.sender
        });
        
        cidEntries.push(newEntry);
        hasUploaded[msg.sender] = true;
        
        emit CIDStored(_cid, _description, block.timestamp, msg.sender);
    }

    /**
     * @dev Get the total number of stored CIDs
     * @return The number of stored CIDs
     */
    function getTotalCIDs() public view returns (uint256) {
        return cidEntries.length;
    }

    /**
     * @dev Get CID entry by index
     * @param index The index of the CID entry
     * @return The CID entry at the specified index
     */
    function getCIDEntry(uint256 index) public view returns (
        string memory cid,
        string memory description,
        uint256 timestamp,
        address uploader
    ) {
        require(index < cidEntries.length, "Index out of bounds");
        CIDEntry memory entry = cidEntries[index];
        return (entry.cid, entry.description, entry.timestamp, entry.uploader);
    }

    /**
     * @dev Check if an address has uploaded a CID
     * @param _address The address to check
     * @return Whether the address has uploaded a CID
     */
    function hasAddressUploaded(address _address) public view returns (bool) {
        return hasUploaded[_address];
    }
} 