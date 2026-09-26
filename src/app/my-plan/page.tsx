"use client";

import PlanWorkoutCard from "@/components/my-plan/PlanWorkoutCard";
import SavedWorkoutCard from "@/components/my-plan/SavedWorkoutCard";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react"; 

function MyPlanContent() {
  const { planList, savedList } = usePlan();

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const [userTab, setUserTab] = useState<"plan" | "saved" | null>(null);
  const activeTab = userTab ?? (tabFromUrl === "saved" ? "saved" : "plan");

  const activeList = activeTab === "plan" ? planList : savedList;

  const totalExercises = activeList.length;
  const totalMinutes = activeList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = activeList.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0,
  );

  const currentList = activeTab === "plan" ? [...planList] : [...savedList];

  const sortedList = currentList.sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-[var(--font-oswald)] tracking-wide text-white uppercase">
          MY PLAN
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#12151C] border border-[#222733] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#222733]">
        <div className="space-y-1">
          <span className="text-xs text-gray-400 font-medium">Exercises</span>
          <div className="text-3xl font-extrabold font-[var(--font-oswald)] text-[#CCFF00]">
            {totalExercises}
          </div>
        </div>

        <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
          <span className="text-xs text-gray-400 font-medium">Minutes</span>
          <div className="text-3xl font-extrabold font-[var(--font-oswald)] text-white">
            {totalMinutes}
          </div>
        </div>

        <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
          <span className="text-xs text-gray-400 font-medium">Calories</span>
          <div className="text-3xl font-extrabold font-[var(--font-oswald)] text-white">
            {totalCalories}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="bg-[#12151C] border border-[#222733] p-1 rounded-full flex items-center gap-1">
          <button
            onClick={() => setUserTab("plan")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition ${
              activeTab === "plan"
                ? "bg-[#161A23] text-white border border-[#222733]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {`Today's`} Plan
          </button>
          <button
            onClick={() => setUserTab("saved")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition ${
              activeTab === "saved"
                ? "bg-[#161A23] text-white border border-[#222733]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-gray-400 font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "duration" | "calories" | "rating")
            }
            className="bg-[#12151C] border border-[#222733] text-white text-xs font-bold px-3 py-2 rounded-xl outline-none focus:border-[#CCFF00] transition"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedList.length > 0 ? (
        <div className="space-y-4">
          {sortedList.map((workout) =>
            activeTab === "plan" ? (
              <PlanWorkoutCard key={workout.id} workout={workout} />
            ) : (
              <SavedWorkoutCard key={workout.id} workout={workout} />
            ),
          )}
        </div>
      ) : (
        <div className="border border-dashed border-[#222733] rounded-2xl p-12 sm:p-20 text-center space-y-4 bg-[#12151C]/40">
          <h2 className="text-xl sm:text-2xl font-extrabold font-[var(--font-oswald)] text-white tracking-wider uppercase">
            NOTHING HERE YET
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs font-bold px-6 py-3 rounded-full transition active:scale-95 shadow-lg"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}