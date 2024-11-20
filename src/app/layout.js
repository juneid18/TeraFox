import localFont from "next/font/local";
import { GoogleAnalytics } from '@next/third-parties/google'

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

export const metadata = {
  title: "TeraFox | TeraFox Movies - 480p Movies, 720p Movies, 1080p Movies, Dual Audio Movies",
  description: "terafox, movies mod, Moviesmod.org, MoviesMod.rip, Moviesmod.com, Moviesverse, Moviesflix, Download Hollywood Movies, Hindi Movies, Anime, Kdrama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS} />
    </html>
  );
}
