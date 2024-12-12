"use client";

import { Gift } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface GiftTableProps {
  gifts: Gift[];
  variant: 'admin' | 'public';
  onEdit?: (gift: Gift) => void;
  eventId: string;
  onUpdate: (gifts: Gift[]) => void;
}

export function GiftTable({ 
  gifts, 
  variant,
  onEdit,
  eventId,
  onUpdate
}: GiftTableProps) {
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);
  const [holdProgress, setHoldProgress] = useState<{ [key: string]: number }>({});
  const [isBlocked, setIsBlocked] = useState<{ [key: string]: boolean }>({});

  const handleReservationChange = async (gift: Gift) => {
    if (isBlocked[gift.id]) return;

    try {
      const response = await fetch(`/api/events/${gift.event_id}/gifts/${gift.id}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_reserved: !gift.is_reserved }),
      });

      if (response.ok) {
        const updatedGifts = gifts.map(g => 
          g.id === gift.id ? { ...g, is_reserved: !g.is_reserved } : g
        );
        onUpdate(updatedGifts);
        
        setIsBlocked((prev) => ({ ...prev, [gift.id]: true }));
        setTimeout(() => {
          setIsBlocked((prev) => ({ ...prev, [gift.id]: false }));
        }, 500);
      }
    } catch (error) {
      console.error('Błąd podczas zmiany rezerwacji:', error);
    }
  };

  const handleMouseDown = (gift: Gift) => {
    if (!gift.is_reserved || holdTimer || isBlocked[gift.id]) return;
    
    const timer = setInterval(() => {
      setHoldProgress((prev) => {
        const newProgress = (prev[gift.id] || 0) + (100 / 3000) * 100;
        if (newProgress >= 100) {
          handleReservationChange(gift);
          clearInterval(timer);
          return { ...prev, [gift.id]: 0 };
        }
        return { ...prev, [gift.id]: newProgress };
      });
    }, 100);
    setHoldTimer(timer);
  };

  const handleMouseUp = (giftId: string) => {
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
      setHoldProgress((prev) => ({ ...prev, [giftId]: 0 }));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Zdjęcie</TableCell>
          <TableCell>Nazwa prezentu</TableCell>
          <TableCell>Sklep</TableCell>
          <TableCell>Status</TableCell>
          {variant === 'admin' && <TableCell>Akcje</TableCell>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {gifts.flatMap((gift) => [
          <TableRow key={`${gift.id}-row`}>
            <TableCell>
              <div className="w-20 h-20">
                <img 
                  src={`https://via.placeholder.com/100`} 
                  alt={gift.name} 
                  className="w-full h-full object-cover rounded" 
                />
              </div>
            </TableCell>
            <TableCell>{gift.name}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => !gift.is_reserved && handleReservationChange(gift)}
                      onMouseDown={() => handleMouseDown(gift)}
                      onMouseUp={() => handleMouseUp(gift.id)}
                      onMouseLeave={() => handleMouseUp(gift.id)}
                      className={cn(
                        "flex items-center gap-2",
                        gift.is_reserved 
                          ? "bg-red-300 text-gray-900 border border-red-200 hover:bg-red-600" 
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      )}
                    >
                      <span>
                        {gift.is_reserved ? 'Anuluj rezerwację' : 'Zarezerwuj'}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  {gift.is_reserved && (
                    <TooltipContent>
                      Przytrzymaj, aby anulować rezerwację
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            {variant === 'admin' && (
              <TableCell>
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(gift)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            )}
          </TableRow>,
          gift.is_reserved && holdProgress[gift.id] > 0 && (
            <TableRow key={`${gift.id}-progress`} className="h-1 p-0">
              <TableCell colSpan={5} className="p-0">
                <div 
                  className="h-1 bg-red-600 transition-all duration-100"
                  style={{ width: `${holdProgress[gift.id]}%` }}
                />
              </TableCell>
            </TableRow>
          )
        ])}
      </TableBody>
    </Table>
  );
} 