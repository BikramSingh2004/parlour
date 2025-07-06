"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const path = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, [typeof window !== "undefined" && localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Attendance", href: "/attendance" },
    ...(isLoggedIn
      ? [{ label: "Dashboard", href: "/dashboard" }]
      : [{ label: "Login", href: "/login" }]),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1e293b] border-b border-gray-600 shadow-md px-6 py-4 text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-semibold tracking-wide">
          Parlour Admin
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className="hidden lg:flex gap-6 items-center">
          {links.map((link) => {
            const active = path === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-5 py-2 text-lg rounded-xl transition-all duration-200 border 
                    ${
                      active
                        ? "bg-green-500 text-black border-green-500"
                        : "text-gray-200 border-transparent hover:border-green-400 hover:text-green-300"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="ml-4 px-5 py-2 text-lg rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {menuOpen && (
        <ul className="flex flex-col gap-4 mt-4 lg:hidden">
          {links.map((link) => {
            const active = path === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block w-full px-5 py-3 text-lg rounded-xl border transition-all 
                    ${
                      active
                        ? "bg-green-500 text-black border-green-500"
                        : "text-gray-100 border-gray-700 hover:border-green-400 hover:text-green-300"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-5 py-3 text-lg rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          )}
        </ul>
      )}
    </nav>
  );
}
