import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { BackgroundMesh } from "@/components/BackgroundMesh";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prabod Jayasinghe",
  description:
    "Full-stack developer specializing in modern web technologies, cloud architecture, and AI-powered applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <PortfolioProvider>
          <BackgroundMesh />
          <div className="noise-overlay" />
          <FloatingSidebar />
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
