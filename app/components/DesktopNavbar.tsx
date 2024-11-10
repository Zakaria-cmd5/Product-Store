"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNavbar = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/newProduct", label: "New Product" },
    { href: "/cart", label: "Cart" },
    { href: "/order", label: "Order Now" },
  ];

  return (
    <>
      <ul className="hidden md:flex items-center space-x-4 md:space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames(
                "font-semibold text-gray-600 hover:text-teal-500 transition-colors duration-200",
                {
                  "border-b-4 border-teal-600": link.href === currentPath,
                }
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-600 hover:text-teal-500 transition-colors duration-200"
        >
          Login
        </Link>
        <button className="bg-teal-500 px-4 py-2 rounded-full transform transition-transform duration-200 hover:scale-110">
          <Link href="/signup" className="text-white font-semibold">
            Create account
          </Link>
        </button>
      </div>
    </>
  );
};

export default DesktopNavbar;
