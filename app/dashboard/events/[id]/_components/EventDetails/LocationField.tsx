import { MapPinIcon } from "lucide-react";
import { EditableField } from "../../../_components/EditableField";
import { Event } from "@/utils/types";

interface LocationFieldProps {
  event: Event;
  isOwner: boolean;
  onUpdate: (event: Event) => void;
}

export function LocationField({ event, isOwner, onUpdate }: LocationFieldProps) {
  const handleUpdate = async (newValue: string) => {
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: newValue }),
      });
      
      const data = await response.json();
      if (data.data) {
        onUpdate({ ...event, location: newValue });
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji lokalizacji:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-black">Miejsce wydarzenia:</span>
      <MapPinIcon className="h-5 w-5 text-gray-500" />
      {isOwner ? (
        <EditableField
          value={event.location}
          className="text-lg text-gray-700"
          onSave={handleUpdate}
        />
      ) : (
        <span className="text-lg text-gray-700">{event.location}</span>
      )}
    </div>
  );
} 