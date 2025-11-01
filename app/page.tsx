"use client";

import { useEffect, useState } from "react";

import { LoginScreen } from "@/components/auth/login";
import { AppLayout } from "@/components/layouts/app-layout";
import { useAuth } from "@/contexts/auth-context";
import { useInactivityLogout } from "@/hooks/use-inactivity-logout";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const { user, isLoading } = useAuth();

  useInactivityLogout();

  useEffect(() => {
    // defer setting mounted to next microtask to avoid synchronous update warning
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted || isLoading) {
    return null;
  }

  return user ? <AppLayout /> : <LoginScreen />;
}
