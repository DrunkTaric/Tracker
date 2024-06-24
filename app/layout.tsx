import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ReactQuery from "@/provider/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tracker",
  description: "tasks managment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen w-screen"}>
        <Nav />
        <div className="h-full">
          <ReactQuery>
            {children}
          </ReactQuery>
        </div>
      </body>
    </html>
  );
}
