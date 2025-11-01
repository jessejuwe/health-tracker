import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required").min(2, "Name must be at least 2 characters"),
  dosage: z.string().min(1, "Dosage is required").min(2, "Dosage must be at least 2 characters"),
  frequency: z.string().min(1, "Frequency is required").min(2, "Frequency must be at least 2 characters"),
});

export const vitalsSchema = z.object({
  systolic: z.coerce.number().min(40, "Systolic must be at least 40").max(300, "Systolic must be less than 300"),
  diastolic: z.coerce.number().min(20, "Diastolic must be at least 20").max(200, "Diastolic must be less than 200"),
  heartRate: z.coerce.number().min(30, "Heart rate must be at least 30").max(200, "Heart rate must be less than 200"),
  weight: z.coerce.number().min(10, "Weight must be at least 10 kg").max(300, "Weight must be less than 300 kg"),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
export type VitalsFormData = z.infer<typeof vitalsSchema>;
