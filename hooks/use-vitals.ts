"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth-context";
import { VitalEntry } from "@/types/vitals";

export function useVitals() {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<VitalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStorageKey = () => `vitals-${user?.username}`;

  const loadVitals = () => {
    if (!user) {
      setVitals([]);
      return;
    }

    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      try {
        setVitals(JSON.parse(stored));
      } catch {
        setVitals([]);
      }
    } else {
      setVitals([]);
    }
  };

  useEffect(() => {
    if (!user) {
      setVitals([]);
      setIsLoading(false);
      return;
    }

    loadVitals();
    setIsLoading(false);

    const handleStorageChange = () => {
      loadVitals();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  const addVitalEntry = (entry: Omit<VitalEntry, "id" | "timestamp">) => {
    const newEntry: VitalEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...vitals];
    setVitals(updated);
    if (user) {
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }

    return newEntry;
  };

  return { vitals, addVitalEntry, isLoading };
}
