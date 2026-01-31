import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

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
  title: "Kitten Predictor",
  description: "Predict the appearance of kittens based on their parents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className='absolute bottom-0 flex flex-row justify-between items-center w-full text-center'>
          <div className="w-[24px]"></div>
          <small>
            Copyright &copy; 2026 Elizabeth Tennant 
          </small>
          <a href="https://github.com/ertennant" className="p-2">
            <Image
              src="./github-mark.svg"
              alt="Link to GitHub"
              height={24}
              width={24}
            >
            </Image>
          </a>
        </footer>
      </body>
    </html>
  );
}
