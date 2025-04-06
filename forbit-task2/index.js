import lighthouse from '@lighthouse-web3/sdk'

const apiKey = 'YOUR_API_KEY_HERE';
const uploadResponse = await lighthouse.upload(
  '/home/cosmos/Desktop/wow.jpg', 
  apiKey
);

console.log(uploadResponse);