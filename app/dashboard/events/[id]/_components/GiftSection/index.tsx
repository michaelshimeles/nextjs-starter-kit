import { Gift } from "@/utils/types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { AddGiftDialog } from "./AddGiftDialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { GiftCard } from "../../../_components/GiftCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, ShoppingBag } from "lucide-react";


interface GiftSectionProps {
  gifts: Gift[];
  isOwner: boolean;
  eventId: string;
  onUpdate: (gifts: Gift[]) => void;
}

export function GiftSection({ gifts, isOwner, eventId, onUpdate }: GiftSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [editedGift, setEditedGift] = useState({ name: '', store: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [holdProgress, setHoldProgress] = useState<{ [key: string]: number }>({});
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

  const handleGiftAdded = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/gifts`);
      const data = await response.json();
      if (data.data) {
        onUpdate(data.data);
      }
    } catch (error) {
      console.error('Błąd podczas odświeżania listy prezentów:', error);
    }
  };

  const handleReservationChange = async (gift: Gift) => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/events/${gift.event_id}/gifts/${gift.id}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_reserved: !gift.is_reserved }),
      });

      if (response.ok) {
        const updatedGifts = gifts.map(g => 
          g.id === gift.id ? { ...g, is_reserved: !g.is_reserved } : g
        );
        onUpdate(updatedGifts);
        
        handleGiftAdded();
      }
    } catch (error) {
      console.error('Błąd podczas zmiany rezerwacji:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedGift) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/${selectedGift.event_id}/gifts/${selectedGift.id}/edit`, {
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
        throw new Error('Nie udało się zaktualizować prezentu');
      }

      setIsEditing(false);
      handleGiftAdded(); // Odświeża listę prezentów
    } catch (error: any) {
      console.error('Błąd podczas aktualizacji prezentu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseDown = (gift: Gift) => {
    if (!gift.is_reserved) return;
    if (holdTimer) return;

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

  const handleMouseUp = (gift: Gift) => {
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
      setHoldProgress((prev) => ({ ...prev, [gift.id]: 0 }));
    }
  };

  return (
    <div className="max-w-3xl sm:max-w-screen-xl mx-auto mt-6">
      {isOwner && <AddGiftDialog eventId={eventId} onSuccess={handleGiftAdded} />}
      <div className="mt-6">
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
                    setSelectedGift(null);
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Zdjęcie</TableCell>
              <TableCell>Nazwa prezentu</TableCell>
              <TableCell>Sklep</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
          {gifts.map((gift) => (
  <>
    <TableRow key={gift.id}>
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
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => !gift.is_reserved && handleReservationChange(gift)}
          onMouseDown={() => handleMouseDown(gift)}
          onMouseUp={() => handleMouseUp(gift)}
          onMouseLeave={() => handleMouseUp(gift)}
          className={`flex items-center gap-2 ${
            gift.is_reserved 
              ? 'bg-red-300 text-gray-900 border border-red-200 hover:bg-red-600' 
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          {gift.is_reserved ? 'Anuluj rezerwację' : 'Zarezerwuj'}
        </Button>
      </TableCell>
      <TableCell>
        {isOwner && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedGift(gift);
              setEditedGift({
                name: gift.name,
                store: gift.store
              });
              setIsEditing(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
    {gift.is_reserved && holdProgress[gift.id] > 0 && (
      <TableRow>
        <TableCell colSpan={5}>
          <div 
            className="h-1 bg-red-500 transition-all duration-100"
            style={{ width: `${holdProgress[gift.id]}%` }}
          />
        </TableCell>
      </TableRow>
    )}
  </>
))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}