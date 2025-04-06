const lighthouse = require('@lighthouse-web3/sdk');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

class LighthouseStorage {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Uploads a file to Lighthouse storage
     * @param {string} filePath - Path to the file to upload
     * @returns {Promise<Object>} - Upload response containing CID
     */
    async uploadFile(filePath) {
        try {
            const uploadResponse = await lighthouse.upload(filePath, this.apiKey);
            console.log('File uploaded successfully!');
            console.log('CID:', uploadResponse.data.Hash);
            return uploadResponse;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    /**
     * Retrieves a file from Lighthouse storage using its CID
     * @param {string} cid - Content Identifier of the file
     * @returns {Promise<string>} - File content
     */
    async retrieveFile(cid) {
        try {
            const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
            const data = await response.text();
            console.log('File retrieved successfully!');
            return data;
        } catch (error) {
            console.error('Error retrieving file:', error);
            throw error;
        }
    }

    /**
     * Creates a sample JSON file and uploads it
     * @returns {Promise<Object>} - Upload response
     */
    async uploadSampleData() {
        const sampleData = {
            message: "My first Filecoin storage deal!",
            timestamp: new Date().toISOString(),
            storageProvider: "Lighthouse"
        };

        const filePath = path.join(__dirname, 'sample-data.json');
        fs.writeFileSync(filePath, JSON.stringify(sampleData, null, 2));

        return this.uploadFile(filePath);
    }
}

// Example usage
async function main() {
    const apiKey = process.env.LIGHTHOUSE_API_KEY;
    
    if (!apiKey) {
        console.error('Please set LIGHTHOUSE_API_KEY environment variable');
        process.exit(1);
    }

    const storage = new LighthouseStorage(apiKey);
    
    try {
        // Upload sample data
        const uploadResponse = await storage.uploadSampleData();
        const cid = uploadResponse.data.Hash;
        
        // Retrieve the data
        const retrievedData = await storage.retrieveFile(cid);
        console.log('Retrieved data:', retrievedData);
        
        // Share the CID
        console.log('\nShare this CID in the community chat:');
        console.log(`CID: ${cid}`);
        console.log(`View file: https://gateway.lighthouse.storage/ipfs/${cid}`);
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

// Run the example
if (require.main === module) {
    main();
}

module.exports = LighthouseStorage; 