import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='bg-white'
      >
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}
