"use client";
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="bg-gray-50">
      <nav className="max-w-screen-xl mx-auto py-2">
        <div className="flex items-center bg-white rounded-full h-20 p-4 justify-between shadow-lg">
          <Link
            href="/"
            className="font-bold text-2xl md:text-3xl text-teal-600"
          >
            Snap Cart
          </Link>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
