export function seedDemoData() {
  const demoUsername = "demo"

  // Seed current user
  const currentUser = {
    username: demoUsername,
    loginTime: Date.now(),
  }
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Seed medications
  const medications = [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
    },
    {
      id: "3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at night",
    },
  ]
  localStorage.setItem(`meds-${demoUsername}`, JSON.stringify(medications))

  // Seed vital entries (reverse chronological order)
  const now = Date.now()
  const vitals = [
    {
      id: "1",
      systolic: 128,
      diastolic: 82,
      heartRate: 72,
      weight: 185,
      timestamp: now,
    },
    {
      id: "2",
      systolic: 125,
      diastolic: 80,
      heartRate: 70,
      weight: 184,
      timestamp: now - 86400000, // 1 day ago
    },
    {
      id: "3",
      systolic: 130,
      diastolic: 85,
      heartRate: 75,
      weight: 186,
      timestamp: now - 172800000, // 2 days ago
    },
    {
      id: "4",
      systolic: 126,
      diastolic: 81,
      heartRate: 71,
      weight: 185,
      timestamp: now - 259200000, // 3 days ago
    },
  ]
  localStorage.setItem(`vitals-${demoUsername}`, JSON.stringify(vitals))
}
