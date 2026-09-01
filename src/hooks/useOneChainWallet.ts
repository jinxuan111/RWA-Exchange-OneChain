// src/hooks/useOneChainWallet.ts
"use client";

export interface UseOneChainWalletReturn {
  account: any;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnecting: boolean;
  error: any;
  address: string | null;
  balance: string;
}

export const useOneChainWallet = (): UseOneChainWalletReturn => {
  return {
    account: null,
    isConnected: false,
    connect: async () => {},
    disconnect: async () => {},
    isConnecting: false,
    error: null,
    address: null,
    balance: "0",
  };
};

export default useOneChainWallet;