import { Gift } from "@/utils/types";
import { AddGiftDialog } from "./AddGiftDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GiftTable } from "@/components/gifts/GiftTable";

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

  const handleGiftAdded = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/gifts`);
      const { data } = await response.json();
      if (data) onUpdate(data);
    } catch (error) {
      console.error('Błąd podczas odświeżania listy prezentów:', error);
    }
  };

  const handleStartEditing = (gift: Gift) => {
    setSelectedGift(gift);
    setEditedGift({
      name: gift.name,
      store: gift.store
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedGift) return;
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/events/${selectedGift.event_id}/gifts/${selectedGift.id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedGift.name.trim(),
          store: editedGift.store.trim()
        }),
      });

      if (!response.ok) throw new Error('Nie udało się zaktualizować prezentu');

      setIsEditing(false);
      handleGiftAdded();
    } catch (error) {
      console.error('Błąd podczas aktualizacji prezentu:', error);
    } finally {
      setIsLoading(false);
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
                <Button variant="outline" onClick={() => setIsEditing(false)}>Anuluj</Button>
                <Button onClick={handleSaveEdit} disabled={isLoading}>
                  {isLoading ? 'Zapisywanie...' : 'Zapisz'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <GiftTable 
          gifts={gifts}
          variant={isOwner ? 'admin' : 'public'}
          onEdit={isOwner ? handleStartEditing : undefined}
          eventId={eventId}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  );
}