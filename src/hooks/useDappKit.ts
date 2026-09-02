"use client";

import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";

// 直接使用 window.ethereum 连接
async function connectWalletDirect() {
  console.log("🔗 Direct connect called");
  
  // 检查是否有钱包
  const provider = (window as any).ethereum;
  if (!provider) {
    alert("请安装钱包插件 (OKX Wallet, MetaMask, 或 Binance Wallet)");
    console.error("❌ No ethereum provider found");
    return null;
  }

  try {
    // 请求账户
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    console.log("✅ Connected accounts:", accounts);
    
    if (accounts && accounts.length > 0) {
      return { address: accounts[0] };
    }
    return null;
  } catch (error: any) {
    console.error("❌ Connection error:", error);
    if (error.code === 4001) {
      alert("用户拒绝了连接请求");
    } else {
      alert("连接失败: " + (error.message || "未知错误"));
    }
    return null;
  }
}

export function useDappKit() {
  const { address, isConnected: wagmiConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  
  // 使用本地状态跟踪连接状态
  const [localAddress, setLocalAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // 优先使用 wagmi 的地址，如果没有则使用本地地址
  const effectiveAddress = address || localAddress;
  const isConnected = wagmiConnected || !!localAddress;

  const connect = async () => {
    console.log("🟢 Connect button clicked!");
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      const result = await connectWalletDirect();
      if (result?.address) {
        setLocalAddress(result.address);
        console.log("✅ Wallet connected successfully:", result.address);
        // 刷新页面以更新 UI
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error("❌ Connect error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setLocalAddress(null);
    disconnect();
    console.log("🔌 Disconnected");
  };

  const getBalance = () => {
    const formatted = (balance as any)?.formatted;
    if (formatted) {
      return parseFloat(formatted).toFixed(4);
    }
    return "0";
  };

  const signAndExecuteTransaction = async (transaction: any) => {
    console.log("📝 signAndExecuteTransaction called:", transaction);
    try {
      const provider = (window as any).ethereum;
      if (!provider) {
        throw new Error("No wallet found");
      }
      // 模拟交易
      return { 
        success: true, 
        transactionHash: "0x" + Math.random().toString(16).slice(2, 10),
      };
    } catch (error) {
      console.error("❌ Transaction error:", error);
      throw error;
    }
  };

  return {
    account: effectiveAddress ? { address: effectiveAddress } : null,
    isConnected,
    isConnecting,
    connect,
    disconnect: disconnectWallet,
    balance: getBalance(),
    signAndExecuteTransaction,
  };
}