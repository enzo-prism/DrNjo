import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "auto" | "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "auto",
  setTheme: () => null,
  actualTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "auto",
  storageKey = "dental-strategies-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      return (window.localStorage.getItem(storageKey) as Theme) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light");

  // Time-based theme calculation
  const getTimeBasedTheme = useCallback((): "dark" | "light" => {
    const hour = new Date().getHours();
    // Dark mode from 7 PM (19:00) to 7 AM (07:00)
    // Light mode from 7 AM (07:00) to 7 PM (19:00)
    return (hour >= 19 || hour < 7) ? "dark" : "light";
  }, []);

  // System theme detection
  const getSystemTheme = useCallback((): "dark" | "light" => {
    if (typeof window === "undefined" || !window.matchMedia) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  // Determine actual theme based on user preference
  const determineActualTheme = useCallback((): "dark" | "light" => {
    switch (theme) {
      case "auto":
        return getTimeBasedTheme();
      case "light":
        return "light";
      case "dark":
        return "dark";
      case "system":
        return getSystemTheme();
      default:
        return getTimeBasedTheme(); // Default to auto behavior
    }
  }, [theme, getSystemTheme, getTimeBasedTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const newActualTheme = determineActualTheme();
    
    root.classList.remove("light", "dark");
    root.classList.add(newActualTheme);
    setActualTheme(newActualTheme);

    // Set up listeners for system theme changes and time-based updates
    let intervalId: NodeJS.Timeout | null = null;
    let mediaQuery: MediaQueryList | null = null;

    if (theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = () => {
        const systemTheme = getSystemTheme();
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
        setActualTheme(systemTheme);
      };
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleSystemThemeChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }

    if (theme === "auto") {
      // Check every minute for time changes
      intervalId = setInterval(() => {
        const timeTheme = getTimeBasedTheme();
        if (timeTheme !== actualTheme) {
          root.classList.remove("light", "dark");
          root.classList.add(timeTheme);
          setActualTheme(timeTheme);
        }
      }, 60000); // Check every minute
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (mediaQuery) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", () => {});
        } else {
          mediaQuery.removeListener(() => {});
        }
      }
    };
  }, [theme, actualTheme, determineActualTheme, getSystemTheme, getTimeBasedTheme]);

  const value = {
    theme,
    actualTheme,
    setTheme: (theme: Theme) => {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, theme);
        }
      } catch {
        // ignore storage errors (e.g., SSR or private mode)
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
