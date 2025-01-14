import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Event } from "@/utils/types";
import { EditableField } from "../../../_components/EditableField";

interface DateFieldProps {
  event: Event;
  isOwner: boolean;
  onUpdate: (event: Event) => void;
}

export function DateField({ event, isOwner, onUpdate }: DateFieldProps) {
  const handleUpdate = async (newDate: string) => {
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_date: newDate
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Błąd podczas aktualizacji daty');
      }

      onUpdate({
        ...event,
        event_date: newDate
      });
      
    } catch (error) {
      console.error('Błąd podczas aktualizacji daty:', error);
    }
  };

  const date = new Date(event.event_date);
  
  const formattedDate = event.event_date 
    ? format(date, "d MMMM yyyy', godz.' HH:mm", { locale: pl })
    : "Brak daty";

  const dateForInput = event.event_date 
    ? format(date, "yyyy-MM-dd'T'HH:mm")
    : "";

  return (
    <div className="flex items-center gap-2 text-gray-700">
      <span className="text-black">Data wydarzenia:</span>
      {isOwner ? (
        <EditableField
          value={dateForInput}
          type="datetime-local"
          className="text-lg text-gray-700"
          onSave={handleUpdate}
          displayFormat="d MMMM yyyy', godz.' HH:mm"
        />
      ) : (
        <div className="text-lg text-gray-700">
          {formattedDate}
        </div>
      )}
    </div>
  );
} 