import Image from "next/image";
import bannerImg from "@/assets/banner.png";

export default function HeroBanner() {
  return (
    <section className="bg-[#12151C] border border-[#222733] rounded-2xl p-6 sm:p-10 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 overflow-hidden">
      <div className="flex-1 space-y-4 max-w-2xl">
        <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
          WORKOUT LIBRARY
        </p>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-[var(--font-oswald)] tracking-tight text-white uppercase leading-[1.1]">
          TRAIN WITH INTENT. <br className="hidden sm:inline" /> LOG EVERY SET.
        </h1>

        <p className="text-gray-400 text-sm sm:text-base leading-relaxed pt-1 max-w-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into {"today's"} plan, and watch the {"week's"} work add up.
        </p>

        <div className="pt-2">
          <a
            href="#library"
            className="inline-block bg-[#CCFF00] hover:bg-[#bce600] text-black font-bold font-[var(--font-oswald)] px-6 py-3 rounded-lg text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-[#CCFF00]/20"
          >
            BROWSE WORKOUTS
          </a>
        </div>
      </div>

      <div className="w-full md:w-5/12 flex justify-center md:justify-end">
        <Image
          src={bannerImg}
          alt="FitLog Workout Companion"
          priority
          className="w-full h-auto max-w-[280px] sm:max-w-[340px] md:max-w-full object-contain filter drop-shadow-xl"
        />
      </div>
    </section>
  );
}