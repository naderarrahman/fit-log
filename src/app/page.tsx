import HeroBanner from "@/components/home/HeroBanner";
import WorkoutCard from "@/components/home/WorkoutCard";
import WorkoutLibrary from "@/components/home/WorkoutLibrary";
import { Workout } from "@/types/workout";


const getWorkouts = async (): Promise<Workout[]> => {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog',{cache: "no-store"})
  if (!res.ok) {
    throw new Error('Failed to fetch workouts');
  }
  return res.json();
}


export default async function Homepage() {
  const workouts = await getWorkouts()
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroBanner />
      <WorkoutLibrary workouts={workouts} />
    </main>
  );
}
