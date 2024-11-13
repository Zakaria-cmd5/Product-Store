"use client";

import { logoutAction } from "../actions/logoutAction";

const LogoutButton = () => {
  return (
    <button
      onClick={() => logoutAction()}
      className="bg-rose-400 px-4 py-2 rounded-full transform transition-transform duration-200 hover:scale-110 text-white font-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
