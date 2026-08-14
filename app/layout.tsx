import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIGFT — Private Family Office",
  description: "ZIGFT is a private family office built to compound, preserve, and develop wealth across generations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070709] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
