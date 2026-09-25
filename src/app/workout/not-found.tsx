import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-7xl sm:text-9xl font-extrabold font-[var(--font-oswald)] tracking-widest text-[#CCFF00]">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-oswald)] text-white uppercase">
          Workout Not Found
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          The workout you are looking for does not exist or has been removed from our library.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#CCFF00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b3e600] transition-colors text-sm uppercase tracking-wider"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Library
      </Link>
    </main>
  );
}