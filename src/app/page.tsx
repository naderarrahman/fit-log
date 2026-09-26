import HeroBanner from "@/components/home/HeroBanner";
import WorkoutLibrary from "@/components/home/WorkoutLibrary";
import { Workout } from "@/types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
};

export default async function Homepage() {
  const workouts = await getWorkouts();
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroBanner />
      <WorkoutLibrary workouts={workouts} />
    </main>
  );
}
