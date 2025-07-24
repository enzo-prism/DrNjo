import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "dark") return <Moon className="h-5 w-5" />;
    if (theme === "light") return <Sun className="h-5 w-5" />;
    return <Sun className="h-5 w-5" />; // System default to sun icon
  };

  const getTooltip = () => {
    if (theme === "light") return "Switch to dark mode";
    if (theme === "dark") return "Switch to system theme";
    return "Switch to light mode";
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-gray-700 dark:text-gray-200"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  );
}