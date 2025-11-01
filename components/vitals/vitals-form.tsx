"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVitals } from "@/hooks/use-vitals";
import { vitalsSchema, type VitalsFormData } from "@/lib/zod";

export default function VitalsForm() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const { addVitalEntry } = useVitals();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VitalsFormData>({
    resolver: standardSchemaResolver(vitalsSchema),
  });

  const onSubmit = (data: VitalsFormData) => {
    try {
      addVitalEntry({
        systolic: +data.systolic,
        diastolic: +data.diastolic,
        heartRate: +data.heartRate,
        weight: +data.weight,
      });

      setMessageType("success");
      setMessage("Vital signs logged successfully!");
      reset();

      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessageType("error");
      setMessage("Failed to log vital signs");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {message && (
        <Alert className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          <AlertDescription className={messageType === "success" ? "text-green-800" : "text-red-800"}>
            {message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="systolic">Systolic (mmHg)</Label>
          <Input id="systolic" type="number" placeholder="e.g., 120" {...register("systolic")} />
          {errors.systolic && <p className="text-sm text-red-600">{errors.systolic.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
          <Input id="diastolic" type="number" placeholder="e.g., 80" {...register("diastolic")} />
          {errors.diastolic && <p className="text-sm text-red-600">{errors.diastolic.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="heartrate">Heart Rate (bpm)</Label>
          <Input id="heartrate" type="number" placeholder="e.g., 70" {...register("heartRate")} />
          {errors.heartRate && <p className="text-sm text-red-600">{errors.heartRate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" step="0.1" placeholder="e.g., 70" {...register("weight")} />
          {errors.weight && <p className="text-sm text-red-600">{errors.weight.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Log Vital Signs
      </Button>
    </form>
  );
}
