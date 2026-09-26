"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import { toast } from "react-toastify";
import { FiClock, FiStar, FiCheck, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

export default function PlanWorkoutCard({ workout }: { workout: Workout }) {
  const { planList, setPlanList } = usePlan();

  const handleRemove = () => {
    setPlanList(planList.filter((item) => item.id !== workout.id));
    toast.info("Removed from today's plan");
  };

  const handleMarkAsDone = () => {
    setPlanList(planList.filter((item) => item.id !== workout.id));
    toast.success("Workout completed! Great job!");
  };

  return (
    <div className="bg-[#12151C] border border-[#222733] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:border-[#2e3545]">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#1a1f2c]">
          <Image
            src={workout.image || "/placeholder.jpg"}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-white font-extrabold font-[var(--font-oswald)] tracking-wide text-lg sm:text-xl uppercase">
            {workout.name}
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            {workout.equipment}
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-gray-300 font-medium">
            <span className="flex items-center gap-1 text-[#CCFF00]">
              <FiClock className="w-3.5 h-3.5" />
              <span>{workout.duration} min</span>
            </span>

            <span className="flex items-center gap-1 text-orange-400">
              <FaFire className="w-3.5 h-3.5" />
              <span>{workout.caloriesBurned} kcal</span>
            </span>

            <span className="flex items-center gap-1 text-yellow-400">
              <FiStar className="w-3.5 h-3.5 fill-yellow-400" />
              <span>{workout.rating}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-[#222733] pt-3 sm:pt-0">
        <Link
          href={`/workout/${workout.id}`}
          className="text-xs font-semibold text-gray-300 hover:text-white px-4 py-2.5 rounded-full border border-[#222733] hover:border-gray-500 transition"
        >
          View Details
        </Link>

        <button
          onClick={handleMarkAsDone}
          className="flex items-center gap-1.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs font-bold px-4 py-2.5 rounded-full transition active:scale-95 shadow-md"
        >
          <FiCheck className="w-4 h-4 stroke-[3]" />
          <span>Mark as Done</span>
        </button>

        <button
          onClick={handleRemove}
          title="Remove"
          className="text-gray-400 hover:text-red-400 p-2 transition rounded-full hover:bg-red-500/10"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}