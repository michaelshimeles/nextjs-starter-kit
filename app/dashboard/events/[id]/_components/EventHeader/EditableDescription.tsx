import { EditableField } from "../../../_components/EditableField";
import { Event } from "@/utils/types";

interface EditableDescriptionProps {
  event: Event;
  isOwner: boolean;
  onUpdate: (event: Event) => void;
}

export function EditableDescription({ event, isOwner, onUpdate }: EditableDescriptionProps) {
  const handleUpdate = async (newValue: string) => {
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newValue }),
      });
      
      const data = await response.json();
      if (data.data) {
        onUpdate({ ...event, description: newValue });
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji opisu:', error);
    }
  };

  return (
    <div className="w-full">
      {isOwner ? (
        <EditableField
          value={event.description || ''}
          className="w-full"
          type="textarea"
          onSave={handleUpdate}
        />
      ) : (
        <p className="text-sm text-gray-100 mt-2">
          {event.description || 'Brak opisu'}
        </p>
      )}
    </div>
  );
}