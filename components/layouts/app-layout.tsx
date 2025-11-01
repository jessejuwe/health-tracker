import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../containers/header";
import Tabs from "../containers/tabs";

// Simulated loading screen
const LoadingScreen = () => (
  <div className="gradient-bg flex min-h-screen items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-white border-t-transparent"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg font-medium text-white"
      >
        Loading Health Tracker...
      </motion.p>
    </div>
  </div>
);

export function AppLayout() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-background min-h-screen">
      <Header />
      <Tabs />
    </main>
  );
}
