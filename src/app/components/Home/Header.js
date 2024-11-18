import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, X } from "lucide-react";
import { CiCoffeeCup } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:text-gray-200 transition-colors"
          >
            TeraFox
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavigationLinks />
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col gap-3 py-4">
            <NavigationLinks />
          </nav>
        </div>
      </div>
    </header>
  );
}

// Separated navigation links component for reusability
function NavigationLinks() {
  return (
    <>
      <Link
        href="https://t.me/+DeJ0j4FqXNk3MjU1"
        className="flex justify-center items-center gap-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-300/25 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300"
      >
        <FaTelegramPlane
          size={20}
          className="shrink-0"
          aria-label="Join Telegram"
        />
        <span className="whitespace-nowrap">Join Telegram</span>
      </Link>

      <Link
        href="https://drive.google.com/file/d/1LLiJyvlPSnC9BZwGRty7PzadnbTjI1bq/view?usp=drivesdk"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-green-200/25 transition-all duration-300"
      >
        <span className=" relative flex items-center gap-2 rounded-md bg-white px-5 py-2.5 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
          <CiCoffeeCup
            size={20}
            className="shrink-0 text-white"
            aria-label="Coffee Icon"
          />
          <span className="whitespace-nowrap text-white">Buy me coffee</span>
        </span>
      </Link>

      <Link
        href="/notices"
        className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-300"
      >
        <Bell className="w-6 h-6 text-white cursor-pointer transition-colors hover:text-yellow-500" />
      </Link>
    </>
  );
}
