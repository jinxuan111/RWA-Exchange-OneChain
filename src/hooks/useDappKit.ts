"use client";

import { useAccount, useConnect, useDisconnect, useBalance, useSignMessage } from "wagmi";
import { injected } from "wagmi/connectors";

export function useDappKit() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { signMessageAsync } = useSignMessage();

  const connectWallet = async () => {
    console.log("🔗 connectWallet called");
    try {
      const result = await connect({ connector: injected() });
      console.log("✅ Connect result:", result);
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

  // 模拟 signAndExecuteTransaction（实际项目需要连接真实合约）
  const signAndExecuteTransaction = async (transaction: any) => {
    console.log("📝 signAndExecuteTransaction called:", transaction);
    // 这里模拟交易成功
    return { success: true, transactionHash: "0xmockhash" };
  };

  return {
    account: address ? { address } : null,
    isConnected,
    connect: connectWallet,
    disconnect,
    balance: getBalance(),
    signAndExecuteTransaction,  // 👈 添加这一行
  };
}