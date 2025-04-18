import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/main/common/SmoothScroll";
import { Globe } from "@/components/magicui/globe";
import TransitionLayout from "@/components/main/common/TransitionLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "Anuj Verma | %s",
    default: "Anuj Verma",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Globe />
        {/* <SmoothScroll /> */}
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}
