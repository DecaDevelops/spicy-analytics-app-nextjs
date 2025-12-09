"use client";

import { Bot, LockOpen, SettingsIcon } from "lucide-react";
import { useAuth } from "../_context/auth-context";
import Link from "next/link";
type link = { label: React.ReactNode | string; href: string };

export default function Header() {
  const links: link[] = [
    {
      href: "/bots/archive",
      label: (
        <>
          <Bot size={24} /> Archive of bots
        </>
      ),
    },
    {
      href: "/bots",
      label: "All bots",
    },
  ];
  const { username, isLoggedIn } = useAuth();

  if (isLoggedIn)
    links.push({ href: "/bots/my-chatbots", label: "My chatbots" });
  return (
    <header className="bg-blue-500 w-full p-3">
      <nav className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center hover:rotate-180 duration-300">
          <Link href={`/settings`}>
            <span>
              <SettingsIcon size={48} />
            </span>
          </Link>
        </div>
        <div className="h-full flex flex-row justify-center items-center gap-3">
          {links.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="flex flex-row items-center justify-center gap-2"
            >
              {x.label}
            </Link>
          ))}
        </div>
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
