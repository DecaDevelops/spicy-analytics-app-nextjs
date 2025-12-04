"use client";

import { LockOpen } from "lucide-react";
import { useAuth } from "../_context/auth-context";

export default function Header() {
  const { username, isLoggedIn } = useAuth();
  return (
    <header className="bg-blue-500 w-full p-3">
      <nav className="flex flex-row justify-between">
        <div className="flex flex-row justify-center items-center">ANAL</div>
        <div></div>
        <div
          className={`${
            (isLoggedIn && "bg-green-600") || "bg-red-600"
          } p-2 rounded flex flex-row items-center gap-1`}
        >
          <LockOpen size={16} />
          {(isLoggedIn && "you are authenticated") ||
            "you are not authenticated"}
        </div>
      </nav>
    </header>
  );
}
