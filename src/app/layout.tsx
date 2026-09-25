import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/layout/Navbar";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FITLOG - Train with intent",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-[var(--color-bg-dark)] text-white min-h-screen flex flex-col`}
      >
        <PlanProvider>
          <Navbar/>
          <div className="flex-1">{children}</div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            theme="dark"
          />
        </PlanProvider>
      </body>
    </html>
  );
}