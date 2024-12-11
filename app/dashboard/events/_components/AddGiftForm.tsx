import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogClose } from "@/components/ui/dialog";

interface AddGiftFormProps {
  eventId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddGiftForm({ eventId, onSuccess, onCancel }: AddGiftFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [giftData, setGiftData] = useState({
    name: '',
    price: '0', // Domyślna wartość dla ceny
    store: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/events/${eventId}/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftData),
      });

      if (response.ok) {
        onSuccess?.();
          onCancel?.();
      }
    } catch (error) {
      console.error('Błąd podczas dodawania prezentu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nazwa prezentu</Label>
        <Input 
          required
          value={giftData.name}
          onChange={(e) => setGiftData({...giftData, name: e.target.value})}
        />
      </div>

      <div>
        <Label>WWW</Label>
        <Input 
          value={giftData.store}
          onChange={(e) => setGiftData({...giftData, store: e.target.value})}
        />
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Anuluj
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Dodawanie...' : 'Dodaj prezent'}
        </Button>
      </div>
    </form>
  );
} 