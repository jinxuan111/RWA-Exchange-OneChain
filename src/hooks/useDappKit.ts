"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";

export function useDappKit() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const connectWallet = async () => {
    console.log("🔗 connectWallet called");
    console.log("📡 Available connectors:", connectors);
    
    try {
      // 查找 injected 连接器
      const injectedConnector = connectors.find(c => c.id === 'injected' || c.type === 'injected');
      console.log("🔌 Using connector:", injectedConnector?.name || injectedConnector?.id);
      
      if (injectedConnector) {
        const result = await connect({ connector: injectedConnector });
        console.log("✅ Connect result:", result);
      } else {
        console.error("❌ No injected connector found!");
      }
    } catch (error) {
      console.error("❌ Connect error:", error);
    }
  };

  const getBalance = () => {
    const formatted = (balance as any)?.formatted;
    if (formatted) {
      return parseFloat(formatted).toFixed(4);
    }
    return "0";
  };

  return {
    account: address ? { address } : null,
    isConnected,
    connect: connectWallet,
    disconnect,
    balance: getBalance(),
  };
}