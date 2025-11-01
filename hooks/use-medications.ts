"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth-context";
import { Medication } from "@/types/medications";

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const getStorageKey = () => `meds-${user?.username}`;

  const loadMedications = () => {
    if (!user) {
      setMedications([]);
      return;
    }

    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      try {
        setMedications(JSON.parse(stored));
      } catch {
        setMedications([]);
      }
    } else {
      setMedications([]);
    }
  };

  useEffect(() => {
    if (!user) {
      setMedications([]);
      setIsLoading(false);
      return;
    }

    loadMedications();
    setIsLoading(false);

    const handleStorageChange = () => {
      loadMedications();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  const addMedication = (medication: Omit<Medication, "id">) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
    };

    const updated = [...medications, newMedication];
    setMedications(updated);
    if (user) {
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }

    return newMedication;
  };

  const removeMedication = (id: string) => {
    const updated = medications.filter(med => med.id !== id);
    setMedications(updated);
    if (user) {
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return { medications, addMedication, removeMedication, isLoading };
}
