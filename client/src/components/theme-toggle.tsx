import { Moon, Sun, Monitor, Clock } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, actualTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "auto") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("auto");
    }
  };

  const getIcon = () => {
    if (theme === "auto") return <Clock className="h-5 w-5" />;
    if (theme === "system") return <Monitor className="h-5 w-5" />;
    if (theme === "dark") return <Moon className="h-5 w-5" />;
    if (theme === "light") return <Sun className="h-5 w-5" />;
    return <Sun className="h-5 w-5" />;
  };

  const getCurrentTimeInfo = () => {
    const hour = new Date().getHours();
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { hour, timeString };
  };

  const getTooltip = () => {
    const { hour, timeString } = getCurrentTimeInfo();
    
    if (theme === "auto") {
      const isNightTime = hour >= 19 || hour < 7;
      return `Smart auto mode (${timeString}) - Currently ${isNightTime ? 'dark' : 'light'}`;
    }
    if (theme === "light") return "Light mode - Switch to dark mode";
    if (theme === "dark") return "Dark mode - Switch to system theme";
    if (theme === "system") return "System theme - Switch to smart auto mode";
    return "Switch theme";
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-gray-700 dark:text-gray-200"
        title={getTooltip()}
        aria-label={getTooltip()}
      >
        {getIcon()}
      </button>
    </div>
  );
}
