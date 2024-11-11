"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarAuth from "./NavbarAuth";

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
      <NavbarAuth />
    </>
  );
};

export default DesktopNavbar;
