import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import { StoreProvider } from "../../store/provider";

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
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased tracking-tight`}
        >
          <div className="flex flex-col justify-between min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Navigation />
            {children}

            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
