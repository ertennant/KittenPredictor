import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        <nav className="top-0 w-full bg-white/80 p-2 h-10">
          <a href="/" className="p-2 h-10 hover:bg-white">Basic</a>
          <a href="/advanced" className="p-2 h-10 hover:bg-white">Advanced</a>
        </nav>
        {children}
        <footer className='absolute bottom-0 w-full text-center'>
          <small>
            Copyright &copy; 2025 Elizabeth Tennant 
          </small>
        </footer>
      </body>
    </html>
  );
}
