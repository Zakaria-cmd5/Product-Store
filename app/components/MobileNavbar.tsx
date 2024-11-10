import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MobileNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const currentPath = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { href: "/newProduct", label: "New Product" },
    { href: "/cart", label: "Cart" },
    { href: "/order", label: "Order Now" },
    { href: "/login", label: "Login" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex md:hidden items-center">
        <button
          className="text-teal-600 text-lg font-semibold"
          onClick={() => setOpenMenu(!openMenu)}
        >
          Menu
        </button>
      </div>
      {openMenu && (
        <div
          ref={menuRef}
          className="md:hidden mt-2 absolute right-14 z-10 top-[85px] bg-white flex flex-col items-start p-4 space-y-4 rounded-lg shadow-lg"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                "font-semibold text-gray-600 hover:text-teal-500 transition-colors duration-200 ml-2",
                {
                  "border-b-2 border-teal-600": link.href === currentPath,
                }
              )}
              onClick={() => setOpenMenu(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="bg-teal-500 px-4 py-2 rounded-full w-full text-center"
            onClick={() => setOpenMenu(false)}
          >
            <Link href="/signup" className="text-white font-semibold">
              Create account
            </Link>
          </button>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
