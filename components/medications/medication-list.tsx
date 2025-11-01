"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMedications } from "@/hooks/use-medications";

export default function MedicationList() {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const { medications, removeMedication, isLoading } = useMedications();

  if (isLoading) {
    return <div className="text-muted-foreground text-center">Loading...</div>;
  }

  if (medications.length === 0) {
    return <div className="text-muted-foreground text-center">No medications added yet.</div>;
  }

  return (
    <div className="space-y-3">
      {medications.map((med, index) => (
        <motion.div
          key={med.id}
          initial={{ opacity: 0, y: 20 }}
          animate={deletingIds.has(med.id) ? { opacity: 0, x: -100 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: deletingIds.has(med.id) ? 0 : index * 0.1 }}
          onAnimationComplete={() => {
            if (deletingIds.has(med.id)) {
              removeMedication(med.id);
              setDeletingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(med.id);
                return newSet;
              });
            }
          }}
        >
          <Card>
            <CardContent className="pt-4">
              {confirmDelete === med.id ? (
                <div className="space-y-3">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">
                      Are you sure you want to delete {med.name}?
                    </AlertDescription>
                  </Alert>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setConfirmDelete(null)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setDeletingIds(prev => new Set([...prev, med.id]));
                        setConfirmDelete(null);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{med.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {med.dosage} • {med.frequency}
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(med.id)}>
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
