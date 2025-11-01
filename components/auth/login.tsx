"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { seedDemoData } from "@/lib/seed-demo-data";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    login(username.trim());
  };

  const handleLoadDemoData = () => {
    seedDemoData();
    login("demo");
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle>
            <div className="flex min-w-0 items-start gap-2 md:items-center md:gap-3">
              <Image
                src="/logo.png"
                alt="Health Tracker Logo"
                width={32}
                height={32}
                className="shrink-0 rounded-lg md:size-8"
              />
              <p className="text-2xl">Health Tracker</p>
            </div>
          </CardTitle>
          <CardDescription>Track your medications and vital signs</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 border-t pt-6">
            <p className="text-muted-foreground mb-3 text-center text-sm">Try demo account</p>
            <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleLoadDemoData}>
              Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
