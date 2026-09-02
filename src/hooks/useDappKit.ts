"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";

export function useDappKit() {
  const { address, isConnected: wagmiConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
  }, []);

  const connectWallet = async () => {
    console.log("🔗 connectWallet called");
    console.log("📱 isMobile:", isMobile);
    console.log("📡 Available connectors:", connectors.map(c => c.id));
    
    if (isConnecting) {
      console.log("⏳ Already connecting...");
      return;
    }
    
    setIsConnecting(true);

    try {
      // 检测是否有钱包
      const hasProvider = typeof window !== 'undefined' && (window as any).ethereum;
      console.log("👛 Ethereum provider available:", !!hasProvider);

      // 1. 如果有钱包插件，使用 injected
      if (hasProvider) {
        console.log("🔌 Using injected connector");
        const injectedConnector = connectors.find(c => c.id === 'injected' || c.type === 'injected');
        if (injectedConnector) {
          try {
            // 先请求账户权限
            const provider = (window as any).ethereum;
            if (provider && provider.request) {
              await provider.request({ method: 'eth_requestAccounts' });
            }
          } catch (providerError: any) {
            if (providerError.code === 4001) {
              console.log("👤 User rejected connection");
              setIsConnecting(false);
              return;
            }
          }
          await connect({ connector: injectedConnector });
          console.log("✅ Connected!");
          return;
        }
      }

      // 2. 如果没有插件，提示安装
      alert("请安装钱包插件 (OKX Wallet, MetaMask, 或 Binance Wallet)");
      
    } catch (error: any) {
      console.error("❌ Connect error:", error);
      if (error?.message?.includes('rejected') || error?.code === 4001) {
        console.log("用户拒绝了连接");
      } else {
        alert("连接失败: " + (error?.message || "未知错误"));
      }
    } finally {
      setIsConnecting(false);
    }
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
    return { 
      success: true, 
      transactionHash: "0x" + Math.random().toString(16).slice(2, 10),
    };
  };

  return {
    account: address ? { address } : null,
    isConnected: wagmiConnected,
    isConnecting,
    connect: connectWallet,
    disconnect,
    balance: getBalance(),
    signAndExecuteTransaction,
  };
}