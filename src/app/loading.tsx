
export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner text-[#CCFF00] loading-lg"></span>
      <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
        Loading...
      </span>
    </div>
  );
}
