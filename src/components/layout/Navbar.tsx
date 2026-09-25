"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = usePlan();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            isWorkoutsActive
              ? "bg-[#CCFF00]/10 text-[#CCFF00] font-semibold border border-[#CCFF00]/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Workouts
        </Link>
      </li>
      <li>
        <Link
          href="/my-plan"
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            isMyPlanActive
              ? "bg-[#CCFF00]/10 text-[#CCFF00] font-semibold border border-[#CCFF00]/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#0D0F12]/90 backdrop-blur-md border-b border-[#161922]">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="navbar-start gap-2">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-gray-300 p-2"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#161922] border border-[#222733] rounded-xl z-50 mt-3 w-52 p-2 shadow-2xl space-y-1"
            >
              {navLinks}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="FITLOG Logo"
              width={32}
              height={32}
              className="w-auto h-7"
            />
            <span className="text-xl font-bold font-[var(--font-oswald)] tracking-wider text-white hidden sm:inline-block">
              FIT<span className="text-[#CCFF00]">LOG</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 gap-2 font-sans">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#CCFF00] text-black font-bold text-xs flex items-center justify-center">
              {planList.length}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full bg-[#161922] border border-[#222733] text-gray-300 font-semibold text-xs flex items-center justify-center">
              {savedList.length}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
