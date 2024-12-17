"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust import path
import Link from "next/link";

export default function Header() {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);

  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <div className="text-xl">
        Hello, {userInfo ? userInfo.username : "Guest"}
      </div>
      <div>
        {userInfo ? (
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
