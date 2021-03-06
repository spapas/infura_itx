const { ethers } = require("ethers");

async function main() {
  console.log("Starting")
  send_token_amount = "1" // in matic
  
  const itx = new ethers.providers.JsonRpcProvider(process.env.NETWORK_API);

  // Create a signer instance based on your private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, itx);
  console.log(`Signer public address: ${signer.address}`);

  // Send Ether to the ITX deposit contract
  // ITX will register the deposit after 10 confirmations
  // and credit the gas tank associated with your signer address
  // you can view your balance at any time by calling relay_getBalance
  const depositTx = await signer.sendTransaction({
    // Address of the ITX deposit contract
    to: "0x015C7C7A7D65bbdb117C573007219107BD7486f9",
    // The amount of ether you want to deposit in your ITX gas tank
    value: ethers.utils.parseEther(send_token_amount),
  });
  console.log("Mining deposit transaction...");
  console.log(
    `https://polygonscan.com/tx/${depositTx.hash}`
  );

  // Waiting for the transaction to be mined
  const receipt = await depositTx.wait();

  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();