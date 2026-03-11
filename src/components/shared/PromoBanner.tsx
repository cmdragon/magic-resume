"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-secondary border-b border-border py-3 px-4 flex items-center justify-between w-full z-50 relative">
      <div className="flex items-center space-x-2 flex-1">
        <div className="font-bold text-primary whitespace-nowrap">CMDragon Tools</div>
        <div className="text-sm text-muted-foreground truncate">1000+ Free Online Tools for Productivity</div>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <Button 
          variant="default" 
          size="sm"
          asChild
        >
          <a href="https://tools.cmdragon.cn/" target="_blank" rel="noopener noreferrer">
            Explore Tools
          </a>
        </Button>
        <button
          onClick={handleClose}
          className="p-1 rounded-full hover:bg-accent transition-colors"
          aria-label="Close banner"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}