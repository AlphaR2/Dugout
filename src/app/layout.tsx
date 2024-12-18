import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "../../store/provider";
import Providers from "@/components/Provider";
import WalletContextProvider from "@/components/contexts/ClientWalletProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DUGOUT",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased tracking-tight`}
          >
            <WalletContextProvider>
              <div className="flex flex-col justify-between min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
                {children}
              </div>
            </WalletContextProvider>
          </body>
        </html>
      </Providers>
    </StoreProvider>
  );
}
