"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { ReactNode } from "react";

const robinhoodChain = {
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.mainnet.chain.robinhood.com"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://robinhoodchain.blockscout.com" },
  },
} as const;

// WalletConnect Project ID (免费注册: https://cloud.walletconnect.com)
const projectId = "2f45af83cfbb3fdece4b6d66d2eba34a";

const config = createConfig({
  chains: [robinhoodChain],
  transports: {
    [robinhoodChain.id]: http(),
  },
  connectors: [
    // 1. 桌面端：自动检测浏览器钱包插件
    injected(),
    // 2. 移动端：WalletConnect 扫码/跳转
    walletConnect({ projectId }),
  ],
});

const queryClient = new QueryClient();

export function DappKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}