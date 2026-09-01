"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

// 创建一个完整的主题
const theme = extendTheme({
  colors: {
    purple: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",  // 👈 这里定义了 purple.600
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
    blue: {
      500: "#3b82f6",
      600: "#2563eb",
    },
    green: {
      500: "#22c55e",
      600: "#16a34a",
    },
    whiteAlpha: {
      300: "rgba(255, 255, 255, 0.3)",
      900: "rgba(255, 255, 255, 0.9)",
    },
    blackAlpha: {
      800: "rgba(0, 0, 0, 0.8)",
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

export default Providers;