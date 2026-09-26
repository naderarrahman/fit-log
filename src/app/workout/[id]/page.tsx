import WorkoutDetailCard from "@/components/details/WorkoutDetailCard";
import { Workout } from "@/types/workout";
import { notFound } from "next/navigation";

const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch workout details:", error);
    return [];
  }
};

export default async function WorkoutDetailpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkouts();
  const workoutDetail = workout.find((workout) => workout.id === Number(id));

  if (!workoutDetail) {
    notFound();
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WorkoutDetailCard workout={workoutDetail} />
    </main>
  );
}
