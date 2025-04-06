const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Contract ABI (Application Binary Interface)
const CIDStorageABI = [
    "function storeCID(string memory _cid, string memory _description) public",
    "function getTotalCIDs() public view returns (uint256)",
    "function getCIDEntry(uint256 index) public view returns (string memory cid, string memory description, uint256 timestamp, address uploader)",
    "function hasAddressUploaded(address _address) public view returns (bool)",
    "event CIDStored(string indexed cid, string description, uint256 timestamp, address indexed uploader)"
];

class ContractInteraction {
    constructor(providerUrl, privateKey, contractAddress) {
        this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
        this.wallet = new ethers.Wallet(privateKey, this.provider);
        this.contract = new ethers.Contract(contractAddress, CIDStorageABI, this.wallet);
    }

    /**
     * Store a CID in the smart contract
     * @param {string} cid - The Content Identifier to store
     * @param {string} description - Description of the stored content
     * @returns {Promise<ethers.providers.TransactionReceipt>} - Transaction receipt
     */
    async storeCID(cid, description) {
        try {
            const tx = await this.contract.storeCID(cid, description);
            console.log('Transaction sent:', tx.hash);
            const receipt = await tx.wait();
            console.log('Transaction confirmed in block:', receipt.blockNumber);
            return receipt;
        } catch (error) {
            console.error('Error storing CID:', error);
            throw error;
        }
    }

    /**
     * Get the total number of stored CIDs
     * @returns {Promise<number>} - Total number of CIDs
     */
    async getTotalCIDs() {
        try {
            const total = await this.contract.getTotalCIDs();
            return total.toNumber();
        } catch (error) {
            console.error('Error getting total CIDs:', error);
            throw error;
        }
    }

    /**
     * Get a specific CID entry
     * @param {number} index - Index of the CID entry
     * @returns {Promise<Object>} - CID entry details
     */
    async getCIDEntry(index) {
        try {
            const entry = await this.contract.getCIDEntry(index);
            return {
                cid: entry.cid,
                description: entry.description,
                timestamp: new Date(entry.timestamp.toNumber() * 1000),
                uploader: entry.uploader
            };
        } catch (error) {
            console.error('Error getting CID entry:', error);
            throw error;
        }
    }
}

// Example usage
async function main() {
    // Replace these with your actual values
    const providerUrl = process.env.PROVIDER_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    
    if (!providerUrl || !privateKey || !contractAddress) {
        console.error('Please set PROVIDER_URL, PRIVATE_KEY, and CONTRACT_ADDRESS environment variables');
        process.exit(1);
    }

    const contract = new ContractInteraction(providerUrl, privateKey, contractAddress);
    
    try {
        // Example: Store a CID
        const cid = "QmExampleCID123";
        const description = "My first Filecoin storage deal";
        
        console.log('Storing CID...');
        await contract.storeCID(cid, description);
        
        // Get total CIDs
        const total = await contract.getTotalCIDs();
        console.log('Total CIDs stored:', total);
        
        // Get the last stored CID
        if (total > 0) {
            const lastEntry = await contract.getCIDEntry(total - 1);
            console.log('Last stored CID:', lastEntry);
        }
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

// Run the example
if (require.main === module) {
    main();
}

module.exports = ContractInteraction; 