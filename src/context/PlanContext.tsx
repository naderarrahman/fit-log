"use client";

import { PlanItem, Workout } from "@/types/workout";
import { createContext, useContext, useMemo, useState } from "react";

interface PlanContextType {
  planList: PlanItem[];
  savedList: Workout[];
  setPlanList: React.Dispatch<React.SetStateAction<PlanItem[]>>;
  setSavedList: React.Dispatch<React.SetStateAction<Workout[]>>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider =({children}:{children:React.ReactNode}) => {

    const [planList, setPlanList] = useState<PlanItem[]>([]);
    const [savedList, setSavedList] = useState<Workout[]>([]);

    const valueObject = useMemo(() => ({
        planList,
        savedList,
        setPlanList,
        setSavedList
    }), [planList, savedList, setPlanList, setSavedList]);

    return (
        <PlanContext.Provider value={valueObject}>
            {children}
        </PlanContext.Provider>
    )
}

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}