"use client";

import { ReactNode } from "react";

interface WalletGuardProps {
  children: ReactNode;
  requireWallet?: boolean;
}

export function WalletGuard({ children, requireWallet = false }: WalletGuardProps) {
  // 直接返回 children，不检查钱包
  return <>{children}</>;
}

export default WalletGuard;