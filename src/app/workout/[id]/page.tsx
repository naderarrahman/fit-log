import WorkoutDetailCard from "@/components/details/WorkoutDetailCard";
import { Workout } from "@/types/workout";


const worksout = async () : Promise<Workout[]>=>{
  const res = await fetch ("https://api.abcz.workers.dev/api/fitlog",{
    cache: "no-store"
  })
  return res.json();
}

export default async function WorkoutDetailpage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params; 
  const workout = await worksout();
  const workoutDetail = workout.find(workout => workout.id === Number (id));
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WorkoutDetailCard workout={workoutDetail} />
    </main>
  )
}
