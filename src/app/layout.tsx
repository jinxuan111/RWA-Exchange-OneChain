import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { DappKitProvider } from "@/providers/DappKitProvider";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";

export const metadata: Metadata = {
  title: "Leader Marketplace",
  description: "Trade tokenized real-world assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <DappKitProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </DappKitProvider>
      </body>
    </html>
  );
}