const hre = require("hardhat");

async function main() {
    const MessageStorage = await hre.ethers.getContractFactory("MessageStorage");
    const messageStorage = await MessageStorage.deploy("Hello Filecoin");

    await messageStorage.waitForDeployment();

    const contractAddress = await messageStorage.getAddress();
    console.log("MessageStorage deployed to: ", contractAddress);
    
    // Add more messages
    console.log("\nAdding additional messages...");
    await messageStorage.addMessage("Welcome to the Filecoin network");
    await messageStorage.addMessage("This is a test message");
    await messageStorage.addMessage("Storing multiple messages works!");
    
    // Get message count
    const messageCount = await messageStorage.getMessageCount();
    console.log("\nTotal messages stored:", messageCount.toString());
    
    // Get all messages
    console.log("\nRetrieving all messages:");
    const allMessages = await messageStorage.getAllMessages();
    allMessages.forEach((message, index) => {
        console.log(`Message ${index}: ${message}`);
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})