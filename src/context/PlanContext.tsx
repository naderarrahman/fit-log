"use client";

import { PlanItem, Workout } from "@/types/workout";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface PlanContextType {
  planList: PlanItem[];
  savedList: Workout[];
  setPlanList: React.Dispatch<React.SetStateAction<PlanItem[]>>;
  setSavedList: React.Dispatch<React.SetStateAction<Workout[]>>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planList, setPlanList] = useState<PlanItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      return storedPlan ? JSON.parse(storedPlan) : [];
    } catch {
      return [];
    }
  });

  const [savedList, setSavedList] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedSaved = localStorage.getItem("fitlog_saved");
      return storedSaved ? JSON.parse(storedSaved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(planList));
    } catch (e) {
      console.error("Failed to save planList to localStorage", e);
    }
  }, [planList]);

  useEffect(() => {
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
    } catch (e) {
      console.error("Failed to save savedList to localStorage", e);
    }
  }, [savedList]);

  const valueObject = useMemo(
    () => ({
      planList,
      savedList,
      setPlanList,
      setSavedList,
    }),
    [planList, savedList, setPlanList, setSavedList],
  );

  return (
    <PlanContext.Provider value={valueObject}>{children}</PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
