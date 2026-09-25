"use client";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import Image from "next/image";
import { toast } from "react-toastify";

export default function WorkoutDetailCard({ workout }: { workout: Workout }) {
  const { planList, savedList, setPlanList, setSavedList } = usePlan();

  const handleAddToPlan = () => {
    const isAlreadyInPlan = planList.some((item) => item.id === workout.id);

    if (isAlreadyInPlan) {
      toast.info("Workout is already in today's plan!");
      return;
    }

    if (planList.length >= 5) {
      toast.warning(
        "Daily limit reached! You can only add up to 5 workouts to today's plan.",
      );
      return;
    }

    const updatedSavedList = savedList.filter((item) => item.id !== workout.id);
    setSavedList(updatedSavedList);

    setPlanList([...planList, workout]);
    toast.success("Added to today's plan!");
  };

  const handleSaveForLater = () => {
    const isAlreadySaved = savedList.some((item) => item.id === workout.id);

    if (isAlreadySaved) {
      toast.info("Workout is already saved for later!");
      return;
    }

    const updatedPlanList = planList.filter((item) => item.id !== workout.id);
    setPlanList(updatedPlanList);

    setSavedList([...savedList, workout]);
    toast.success("Saved for later!");
  };

  return (
    <div className="bg-[#12151C] border border-[#222733] rounded-3xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 my-8 shadow-2xl">
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full min-h-[450px] bg-[#161922] rounded-2xl overflow-hidden border border-[#222733]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-[var(--font-oswald)] tracking-wide text-white uppercase">
            {workout.name}
          </h1>

          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            {workout.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {workout.muscleGroups.map((group, index) => (
              <span
                key={index}
                className="bg-[#CCFF00] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="bg-[#161A23] border border-[#222733] rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#222733]/60">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                EQUIPMENT
              </span>
              <span className="text-white font-medium">
                {workout.equipment}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#222733]/60">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                DIFFICULTY
              </span>
              <span className="text-white font-medium">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#222733]/60">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                SETS
              </span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#222733]/60">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                REPS
              </span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#222733]/60">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                DURATION
              </span>
              <span className="text-white font-medium">
                {workout.duration} min
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#222733]/60">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                CALORIES
              </span>
              <span className="text-white font-medium">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">
                RATING
              </span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white uppercase font-[var(--font-oswald)] tracking-wider">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2 text-xs text-gray-300">
                {workout.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 items-start leading-relaxed"
                  >
                    <span className="text-gray-400 font-medium">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#222733]/60">
          <button
            onClick={handleAddToPlan}
            className="w-full sm:w-auto flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Add to {`today's`} plan
          </button>

          <button
            onClick={handleSaveForLater}
            className="w-full sm:w-auto flex-1 bg-[#161A23] hover:bg-[#1E2330] border border-[#222733] text-white font-bold text-xs uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
