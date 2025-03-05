
import React from "react";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const AssistantFloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/assistant");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-24 left-6 z-40 flex items-center justify-center w-14 h-14", // Changed right-6 to left-6
        "rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-colors duration-300",
        "text-white dark:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        "animate-fade-in"
      )}
      aria-label="Assistant de Trading"
    >
      <Bot className="w-6 h-6" />
      <span className="sr-only">Assistant de Trading</span>
    </button>
  );
};

export default AssistantFloatingButton;
