import Image from "next/image";
import { LogOut, Moon, Sun } from "lucide-react";

import { Button } from "../ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/providers/theme-provider";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-background border-border fixed top-0 right-0 left-0 z-40 max-h-28 border-b p-2 md:p-4 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-2 md:items-center">
          <div className="flex min-w-0 items-start gap-2 md:items-center md:gap-3">
            <Image
              src="/logo.png"
              alt="Health Tracker Logo"
              width={32}
              height={32}
              className="shrink-0 rounded-lg md:h-10 md:w-10"
            />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold md:text-2xl lg:text-3xl">Health Tracker</h1>
              <p className="text-muted-foreground truncate text-xs md:text-sm">Welcome, {user?.username}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-1 md:gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={logout} size="icon" className="bg-transparent md:hidden" title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={logout} className="hidden bg-transparent md:flex">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
