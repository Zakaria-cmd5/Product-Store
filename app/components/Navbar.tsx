import { getCartItemCount } from "@/queries/getCartItemCount";
import { getCurrentUser } from "@/queries/getCurrentUser";
import { Role } from "@prisma/client";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const user = await getCurrentUser();

  const cartItemCount = await getCartItemCount(user?.id);

  return (
    <div className="bg-gray-50">
      <nav className="max-w-screen-xl mx-auto py-2">
        <div className="flex items-center bg-white rounded-full h-20 p-4 justify-between shadow-lg">
          <Link
            href="/"
            className="font-bold text-2xl transition-all duration-200 hover:scale-110 md:text-3xl text-teal-600"
          >
            Snap Cart
          </Link>
          {user?.role === Role.ADMIN && (
            <Link
              href="/newProduct"
              className="duration-200 transition-colors hover:text-teal-600"
            >
              New Product
            </Link>
          )}
          <div className="flex items-center space-x-6">
            {user?.id && (
              <Link
                href="/cart"
                className="relative transition-all duration-200 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cartItemCount}
                </div>
              </Link>
            )}
            {user?.id ? (
              <LogoutButton />
            ) : (
              <div className="items-center space-x-4">
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
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
