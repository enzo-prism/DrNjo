import { Moon, Sun, Monitor, Clock } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, actualTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else if (theme === "system") {
      setTheme("auto");
    } else {
      setTheme("light");
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
      return `Auto mode (${timeString}) - Currently ${isNightTime ? 'dark' : 'light'} theme`;
    }
    if (theme === "system") return "System theme - Switch to auto mode";
    if (theme === "dark") return "Dark mode - Switch to system theme";
    if (theme === "light") return "Light mode - Switch to dark mode";
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
      
      {theme === "auto" && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-lg text-xs text-gray-600 dark:text-gray-300 transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${actualTheme === 'dark' ? 'bg-blue-600' : 'bg-yellow-500'}`}></div>
            <span>Auto: {actualTheme === 'dark' ? 'Dark' : 'Light'}</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 mt-1">
            {getCurrentTimeInfo().timeString}
          </div>
        </div>
      )}
    </div>
  );
}