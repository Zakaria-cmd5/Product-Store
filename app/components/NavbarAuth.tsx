import { useSession } from "@/context/SessionContext";
import Link from "next/link";
import Spinner from "./Spinner";

const NavbarAuth = () => {
  const { sessionId, isLoading } = useSession();

  if (isLoading) return <Spinner />;

  return (
    <>
      {sessionId ? (
        <button className="bg-rose-400 px-4 py-2 rounded-full transform transition-transform duration-200 hover:scale-110">
          <Link href="/signup" className="text-white font-semibold">
            Logout
          </Link>
        </button>
      ) : (
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
      )}
    </>
  );
};

export default NavbarAuth;
