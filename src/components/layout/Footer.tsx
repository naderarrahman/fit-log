import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0D12] border-t border-[#1C202B] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-white font-extrabold font-[var(--font-oswald)] text-xl tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        <p className="text-xs text-gray-500 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}