"use client";

import { useEffect } from "react";

import { INACTIVITY_TIMEOUT } from "@/constants";
import { useAuth } from "@/contexts/auth-context";

export function useInactivityLogout() {
  const { logout, user } = useAuth();

  useEffect(() => {
    if (!user) return;

    let timeoutId: NodeJS.Timeout;
    let lastActivityTime = Date.now();

    const resetTimeout = () => {
      lastActivityTime = Date.now();
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
    };

    const handleActivity = () => {
      const now = Date.now();
      if (now - lastActivityTime > 1000) {
        // Only reset if at least 1 second has passed
        resetTimeout();
      }
    };

    // Set initial timeout
    resetTimeout();

    // Listen for user activity
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [user, logout]);
}
