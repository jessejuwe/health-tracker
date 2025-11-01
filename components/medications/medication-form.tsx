"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMedications } from "@/hooks/use-medications";
import { medicationSchema, type MedicationFormData } from "@/lib/zod";

export default function MedicationForm() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const { addMedication } = useMedications();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
  });

  const onSubmit = (data: MedicationFormData) => {
    try {
      addMedication({
        name: data.name.trim(),
        dosage: data.dosage.trim(),
        frequency: data.frequency.trim(),
      });

      setMessageType("success");
      setMessage("Medication added successfully!");
      reset();

      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessageType("error");
      setMessage("Failed to add medication");
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

      <div className="space-y-2">
        <Label htmlFor="med-name">Medication Name</Label>
        <Input id="med-name" type="text" placeholder="e.g., Aspirin" {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="med-dosage">Dosage</Label>
        <Input id="med-dosage" type="text" placeholder="e.g., 500mg" {...register("dosage")} />
        {errors.dosage && <p className="text-sm text-red-600">{errors.dosage.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="med-frequency">Frequency</Label>
        <Input id="med-frequency" type="text" placeholder="e.g., Twice daily" {...register("frequency")} />
        {errors.frequency && <p className="text-sm text-red-600">{errors.frequency.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Add Medication
      </Button>
    </form>
  );
}
