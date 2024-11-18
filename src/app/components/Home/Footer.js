// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} TeraFox. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/aboutus">About Us</Link>
          <Link href="/DMCA">DMCA</Link>
          <Link href="/disclaimer">Site Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
