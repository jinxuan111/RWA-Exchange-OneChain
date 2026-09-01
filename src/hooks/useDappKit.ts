"use client";

import { useState } from 'react';

type Transaction = any;

export function useDappKit() {
  const [account, setAccount] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState('0');
  const [wallets, setWallets] = useState<any[]>([]);

  const connectWallet = async () => {
    // 模拟连接，不实际连接任何钱包
    console.log('Wallet connection is disabled in this version');
    return { success: false, message: 'Wallet connection disabled' };
  };

  const signAndExecuteTransaction = async (transaction: any): Promise<any> => {
    console.warn('Transaction signing is disabled in this version');
    throw new Error('Transaction signing is disabled. Please enable wallet integration.');
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance('0');
  };

  const refreshBalance = async () => {
    // 模拟余额
    setBalance('0');
  };

  return {
    // Account info
    account,
    address: account?.address || null,
    isConnected,
    balance,
    
    // Actions
    connect: connectWallet,
    disconnect: disconnectWallet,
    signAndExecuteTransaction,
    refreshBalance,
    
    // Sui client for direct queries
    suiClient: null,
    
    // Available wallets
    wallets,
  };
}

export default useDappKit;