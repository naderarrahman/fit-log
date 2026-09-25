import HeroBanner from "@/components/home/HeroBanner";
import WorkoutCard from "@/components/home/WorkoutCard";
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
      <section id="library" className="space-y-6 scroll-mt-20">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-oswald)] tracking-wider text-white uppercase">
            THE LIBRARY
          </h2>
          <p className="text-sm text-gray-400 font-medium">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
