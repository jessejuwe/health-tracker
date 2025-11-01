"use client";

import { motion } from "framer-motion";

import { useVitals } from "@/hooks/use-vitals";
import { Card, CardContent } from "@/components/ui/card";

export default function VitalsLog() {
  const { vitals, isLoading } = useVitals();

  if (isLoading) {
    return <div className="text-muted-foreground text-center">Loading...</div>;
  }

  if (vitals.length === 0) {
    return <div className="text-muted-foreground text-center">No vital signs logged yet.</div>;
  }

  return (
    <div className="space-y-3">
      {vitals.map((entry, index) => {
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {formattedDate} at {formattedTime}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded p-3">
                    <p className="text-muted-foreground text-xs">Blood Pressure</p>
                    <p className="font-semibold">
                      {entry.systolic}/{entry.diastolic} mmHg
                    </p>
                  </div>

                  <div className="bg-muted rounded p-3">
                    <p className="text-muted-foreground text-xs">Heart Rate</p>
                    <p className="font-semibold">{entry.heartRate} bpm</p>
                  </div>

                  <div className="bg-muted col-span-2 rounded p-3">
                    <p className="text-muted-foreground text-xs">Weight</p>
                    <p className="font-semibold">{entry.weight} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
