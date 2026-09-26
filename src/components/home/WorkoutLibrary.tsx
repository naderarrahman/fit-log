'use client'

import { Workout } from "@/types/workout";
import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    const matchesName = workout.name?.toLowerCase().includes(q);

    const matchesMuscleGroup = workout.muscleGroups?.some((group) =>
      group.toLowerCase().includes(q),
    );

    const matchesEquipment = workout.equipment?.toLowerCase().includes(q);
    return matchesName || matchesMuscleGroup || matchesEquipment;
  });

  return (
    <section id="library" className="space-y-6 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-oswald)] tracking-wider text-white uppercase">
            THE LIBRARY
          </h2>
          <p className="text-sm text-gray-400 font-medium">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by name, muscle, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12151C] border border-[#222733] text-white placeholder-gray-500 text-xs px-4 py-2.5 rounded-xl outline-none focus:border-[#CCFF00] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px] font-bold uppercase"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#222733] rounded-2xl p-12 text-center space-y-2 bg-[#12151C]/40">
          <h3 className="text-lg font-bold font-[var(--font-oswald)] text-white uppercase tracking-wider">
            No Workouts Found
          </h3>
          <p className="text-xs text-gray-400">
            No exercises match &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}
    </section>
  );
}
