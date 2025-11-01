import { useState } from "react";
import dynamic from "next/dynamic";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const MedicationForm = dynamic(() => import("../medications/medication-form"), { ssr: false, loading: () => <div /> });
const MedicationList = dynamic(() => import("../medications/medication-list"), { ssr: false, loading: () => <div /> });
const VitalsForm = dynamic(() => import("../vitals/vitals-form"), { ssr: false, loading: () => <div /> });
const VitalsLog = dynamic(() => import("../vitals/vitals-log"), { ssr: false, loading: () => <div /> });

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<"medications" | "vitals">("medications");

  return (
    <div>
      <div className="border-border bg-background fixed top-[61px] right-0 left-0 z-30 border-b px-2 md:top-[85px] md:px-4 lg:top-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex gap-2 overflow-x-auto py-2 md:gap-4 md:py-4">
            <Button
              variant={activeTab === "medications" ? "default" : "outline"}
              onClick={() => setActiveTab("medications")}
              className="shrink-0 text-sm md:text-base"
            >
              Medications
            </Button>
            <Button
              variant={activeTab === "vitals" ? "default" : "outline"}
              onClick={() => setActiveTab("vitals")}
              className="shrink-0 text-sm md:text-base"
            >
              Vital Signs
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-[128px] p-2 md:mt-[166px] md:p-4 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
          {activeTab === "medications" && (
            <>
              <Card>
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Add Medication</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <MedicationForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Your Medications</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <MedicationList />
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "vitals" && (
            <>
              <Card>
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Log Vital Signs</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <VitalsForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Vital Signs History</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <VitalsLog />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
