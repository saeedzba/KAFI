import Web3 from 'web3';

// Define the contract address
const contractAddress = "0x6E7914b14AA89C8E83a40D3118552Cd8593477AE";

// Function to handle payment
async function handlePayment() {
  try {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get the selected account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Initialize Web3 with MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Convert 1 ETH to wei
      const amountInWei = web3.utils.toWei('1', 'ether');

      // Send transaction to the contract
      await web3.eth.sendTransaction({
        from: account,
        to: contractAddress,
        value: amountInWei
      });

      console.log("Payment successful!");
    } else {
      console.error("MetaMask not detected.");
    }
  } catch (error) {
    console.error("Failed to make payment:", error);
  }
}

// Call the handlePayment function when the "Pay" button is clicked
document.getElementById("payButton").addEventListener("click", handlePayment);
