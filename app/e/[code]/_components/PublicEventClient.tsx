"use client";

import { useEffect, useState } from 'react';
import { Event, Gift } from '@/utils/types';
import { MapPinIcon, CalendarIcon } from 'lucide-react';
import { GiftTable } from "@/components/gifts/GiftTable";

interface PublicEventClientProps {
  code: string;
}

export function PublicEventClient({ code }: PublicEventClientProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/public/events/${code}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
          return;
        }

        setEvent(data.event);
        setGifts(data.gifts || []);
      } catch (error) {
        setError('Nie udało się pobrać danych wydarzenia');
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      fetchData();
    }
  }, [code]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <p className="text-red-500 mb-4">{error || 'Nie znaleziono wydarzenia'}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-3xl sm:max-w-screen-xl mx-auto shadow border border-gray-200">
        <div className="bg-blue-500 p-6 text-white">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            {event.description && (
              <p className="mt-2 text-white/90">{event.description}</p>
            )}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPinIcon className="h-6 w-6 text-blue-500" />
            <span className="text-lg">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarIcon className="h-6 w-6 text-blue-500" />
            <span className="text-lg">
              {new Date(event.event_date).toLocaleString()}
            </span>
          </div>

          <div className="mt-6">
            <GiftTable 
              gifts={gifts} 
              variant="public"
              eventId={event.id}
              onUpdate={setGifts}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 