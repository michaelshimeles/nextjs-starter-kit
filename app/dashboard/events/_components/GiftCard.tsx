"use client";

import { Gift } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  className?: string;
}

export function GiftCard({ gift, isOwner, className }: GiftCardProps) {
  const [isReserved, setIsReserved] = useState(gift.is_reserved);
  const [isLoading, setIsLoading] = useState(false);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGift, setEditedGift] = useState({
    name: gift.name,
    store: gift.store
  });

  const handleMouseDown = () => {
    if (!isReserved) return;
    
    const timer = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          handleReservationChange();
          clearInterval(timer);
          return 0;
        }
        return prev + (100 / 3000) * 100; // 3000ms = 3s
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

  const handleReservationChange = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/${gift.event_id}/gifts/${gift.id}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_reserved: !isReserved }),
      });

      if (response.ok) {
        setIsReserved(!isReserved);
      }
    } catch (error) {
      console.error('Błąd podczas zmiany rezerwacji:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      const giftId = gift.id.toString();
      const eventId = gift.event_id.toString();
      
      const response = await fetch(`/api/events/${eventId}/gifts/${giftId}/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedGift.name.trim(),
          store: editedGift.store.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Nie udało się zaktualizować prezentu');
      }

      toast.success('Prezent został zaktualizowany');
      setIsEditing(false);
      window.location.reload();
    } catch (error: any) {
      console.error('Błąd podczas aktualizacji prezentu:', error);
      toast.error(error.message || 'Nie udało się zaktualizować prezentu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimer) clearInterval(holdTimer);
    };
  }, [holdTimer]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 relative group">
      {isOwner && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
          title="Edytuj"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </button>
      )}
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogTitle>Edytuj prezent</DialogTitle>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Nazwa prezentu</Label>
              <Input
                value={editedGift.name}
                onChange={(e) => setEditedGift({ ...editedGift, name: e.target.value })}
              />
            </div>
            <div>
              <Label>WWW</Label>
              <Input
                value={editedGift.store}
                onChange={(e) => setEditedGift({ ...editedGift, store: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedGift({ name: gift.name, store: gift.store });
                }}
              >
                Anuluj
              </Button>
              <Button
                onClick={handleEdit}
                disabled={isLoading}
              >
                {isLoading ? 'Zapisywanie...' : 'Zapisz'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between mb-4">
        <div className="w-20 h-20">
          <img 
            src={`https://via.placeholder.com/100`} 
            alt={gift.name} 
            className="w-full h-full object-cover rounded" 
          />
        </div>
        <div className="relative">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="primary" 
                  className={cn(
                    "relative overflow-hidden",
                    isReserved 
                      ? "bg-red-500 hover:bg-yellow-500 text-black"
                      : "bg-gradient-to-r from-green-400 to-teal-700 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
                  )}
                  disabled={isLoading}
                  onClick={!isReserved ? handleReservationChange : undefined}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {isReserved ? 'Reserved' : 'Reserve'}
                  {isReserved && holdProgress > 0 && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-100"
                      style={{ width: `${holdProgress}%` }}
                    />
                  )}
                </Button>
              </TooltipTrigger>
              {isReserved && (
                <TooltipContent>
                  <p>Przytrzymaj przycisk przez 3 sekundy, aby anulować rezerwację</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{gift.name}</div>
        {gift.store && (
          <a 
            href={gift.store.startsWith('http') ? gift.store : `https://${gift.store}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline break-all"
          >
            {gift.store}
          </a>
        )}
      </div>
    </div>
  );
} 