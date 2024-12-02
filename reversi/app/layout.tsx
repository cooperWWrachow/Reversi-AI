import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reversi",
  description: "Reversi: Human vs AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll bg-base-100">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
