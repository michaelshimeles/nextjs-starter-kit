import { EditableField } from "../../../_components/EditableField";
import { Event } from "@/utils/types";

interface EditableTitleProps {
  event: Event;
  isOwner: boolean;
  onUpdate: (event: Event) => void;
}

export function EditableTitle({ event, isOwner, onUpdate }: EditableTitleProps) {
  const handleUpdate = async (newValue: string) => {
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newValue }),
      });
      
      const data = await response.json();
      if (data.data) {
        onUpdate({ ...event, title: newValue });
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji tytułu:', error);
    }
  };

  return isOwner ? (
    <EditableField
      value={event.title}
      className="text-3xl font-bold text-white drop-shadow-md"
      onSave={handleUpdate}
    />
  ) : (
    <h1 className="text-3xl font-bold text-white drop-shadow-md">{event.title}</h1>
  );
} 