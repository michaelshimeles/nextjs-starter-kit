import { Event } from "@/utils/types";
import { LocationField } from "./LocationField";
import { DateField } from "./DateField";

interface EventDetailsProps {
  event: Event;
  isOwner: boolean;
  onUpdate: (event: Event) => void;
}

export function EventDetails({ event, isOwner, onUpdate }: EventDetailsProps) {
  return (
    <div className="max-w-3xl sm:max-w-screen-xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-4">
        <LocationField event={event} isOwner={isOwner} onUpdate={onUpdate} />
        <DateField event={event} isOwner={isOwner} onUpdate={onUpdate} />
      </div>
    </div>
  );
} 