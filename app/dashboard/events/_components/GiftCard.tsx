"use client";

import { Gift } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from 'lucide-react';
import { toast } from "sonner";

interface GiftCardProps {
  gift: {
    id: string;
    event_id: string;
    name: string;
    store: string;
    is_reserved: boolean;
  };
  isOwner: boolean;
  onReservationChange: () => Promise<void>;
  onEdit: () => void;
}

export function GiftCard({ gift, isOwner, onReservationChange }: GiftCardProps) {
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);

  const handleMouseDown = () => {
    if (!gift.is_reserved) return;
    
    const timer = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          onReservationChange();
          clearInterval(timer);
          return 0;
        }
        return prev + (100 / 3000) * 100;
      });
    }, 100);

    setHoldTimer(timer);
  };

  const handleMouseUp = () => {
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimer) {
        clearInterval(holdTimer);
      }
    };
  }, [holdTimer]);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => !gift.is_reserved && onReservationChange()}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`flex items-center gap-2 ${
                gift.is_reserved 
                  ? 'bg-red-300 text-gray-900 border border-red-200 hover:bg-red-600' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {gift.is_reserved ? 'Anuluj rezerwację' : 'Zarezerwuj'}
              {gift.is_reserved && holdProgress > 0 && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-100"
                  style={{ width: `${holdProgress}%` }}
                />
              )}
            </Button>
          </TooltipTrigger>
          {gift.is_reserved && (
            <TooltipContent>
              <p>Przytrzymaj przycisk przez 3 sekundy, aby anulować rezerwację</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}