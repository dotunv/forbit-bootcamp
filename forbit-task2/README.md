# Filecoin Storage Integration with Lighthouse

This project demonstrates how to:
1. Store files on Filecoin using Lighthouse
2. Retrieve stored files using CIDs
3. Store and display CIDs on a smart contract

## Prerequisites

- Node.js (v14 or higher)
- A Lighthouse API key (get it from [Lighthouse Files](https://files.lighthouse.storage/))
- A Filecoin wallet with some FIL tokens
- Access to a Filecoin network node (for smart contract deployment)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
PROVIDER_URL=your_filecoin_rpc_url
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
```

## Usage

### 1. Upload and Retrieve Files

To upload a file and get its CID:
```bash
npm run upload
```

This will:
- Create a sample JSON file
- Upload it to Lighthouse
- Retrieve and display the CID
- Show the file content

### 2. Smart Contract Interaction

To interact with the CIDStorage smart contract:
```bash
npm run contract
```

This will:
- Store a CID in the smart contract
- Display the total number of stored CIDs
- Show the details of the last stored CID

## Smart Contract

The `CIDStorage.sol` contract provides the following functions:
- `storeCID(string cid, string description)`: Store a new CID with description
- `getTotalCIDs()`: Get the total number of stored CIDs
- `getCIDEntry(uint256 index)`: Get details of a specific CID entry
- `hasAddressUploaded(address _address)`: Check if an address has uploaded a CID

## Project Structure

- `lighthouse-storage.js`: Handles file upload and retrieval using Lighthouse
- `CIDStorage.sol`: Smart contract for storing and displaying CIDs
- `contract-interaction.js`: Script to interact with the smart contract

## Security Notes

- Never commit your `.env` file or expose your private keys
- Keep your Lighthouse API key secure
- Use testnet for development and testing

## License

MIT 