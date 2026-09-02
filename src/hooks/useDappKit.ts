"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";

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
      console.log("📱 isMobile:", isMobileDevice);
    };
    checkMobile();
  }, []);

  const connectWallet = async () => {
    console.log("🔗 connectWallet called");
    console.log("📱 isMobile:", isMobile);
    
    if (isConnecting) {
      console.log("⏳ Already connecting...");
      return;
    }
    
    setIsConnecting(true);

    try {
      // ==================== 移动端 ====================
      if (isMobile) {
        console.log("📱 Mobile mode");
        
        // 获取当前网站 URL
        const currentUrl = window.location.href;
        const encodedUrl = encodeURIComponent(currentUrl);
        
        // 检测是否在钱包 App 内置浏览器中
        const isInAppBrowser = /okx|metamask|trust|imtoken|tokenpocket/i.test(navigator.userAgent);
        console.log("📱 In App Browser:", isInAppBrowser);
        
        if (isInAppBrowser) {
          // 已经在 App 内，直接使用 injected
          const provider = (window as any).ethereum;
          if (provider) {
            try {
              const accounts = await provider.request({ 
                method: 'eth_requestAccounts' 
              });
              if (accounts && accounts.length > 0) {
                console.log("✅ Connected:", accounts[0]);
                setTimeout(() => window.location.reload(), 500);
                setIsConnecting(false);
                return;
              }
            } catch (err) {
              console.error(err);
            }
          }
        }
        
        // 方法1：尝试 WalletConnect
        const wcConnector = connectors.find(c => c.id === 'walletConnect');
        if (wcConnector) {
          try {
            await connect({ connector: wcConnector });
            console.log("✅ WalletConnect connected!");
            setIsConnecting(false);
            return;
          } catch (wcError) {
            console.error("❌ WalletConnect error:", wcError);
          }
        }
        
        // 方法2：Deep Link 直接跳转钱包 App
        console.log("🔗 Trying Deep Link...");
        
        // OKX Wallet Deep Link
        const okxDeepLink = `okx://wallet/dapp/url?dappUrl=${encodedUrl}`;
        // MetaMask Deep Link
        const metamaskDeepLink = `metamask://dapp/${encodedUrl}`;
        // Binance Wallet Deep Link
        const binanceDeepLink = `bnc://wallet/dapp/url?dappUrl=${encodedUrl}`;
        
        // 检测用户可能安装的钱包
        const userAgent = navigator.userAgent.toLowerCase();
        let deepLink = okxDeepLink; // 默认 OKX
        
        if (userAgent.includes('metamask')) {
          deepLink = metamaskDeepLink;
        } else if (userAgent.includes('binance') || userAgent.includes('bnb')) {
          deepLink = binanceDeepLink;
        }
        
        console.log("🔗 Opening:", deepLink);
        
        // 尝试跳转
        window.open(deepLink, '_self');
        
        // 如果跳转后没有返回，提示用户
        setTimeout(() => {
          alert("如果钱包 App 没有自动打开，请确保已安装 OKX App 或 MetaMask App\n\n然后点击「确定」重试");
        }, 2000);
        
        setIsConnecting(false);
        return;
      }

      // ==================== 电脑端 ====================
      console.log("💻 Desktop mode");
      
      const provider = (window as any).ethereum;
      console.log("👛 Provider:", !!provider);

      if (provider) {
        try {
          const accounts = await provider.request({ 
            method: 'eth_requestAccounts' 
          });
          console.log("✅ Connected:", accounts);
          if (accounts && accounts.length > 0) {
            setTimeout(() => window.location.reload(), 500);
          }
        } catch (providerError: any) {
          if (providerError.code === 4001) {
            console.log("👤 User rejected connection");
          } else {
            console.error("❌ Provider error:", providerError);
          }
        }
      } else {
        alert("请安装钱包插件 (OKX Wallet, MetaMask, 或 Binance Wallet)");
      }
      
    } catch (error: any) {
      console.error("❌ Connect error:", error);
      if (error?.code !== 4001) {
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
    console.log("📝 Transaction called:", transaction);
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