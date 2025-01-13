"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { Event } from '@/utils/types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
          return;
        }
        
        setEvents(data.data || []);
      } catch (err) {
        setError('Nie udało się pobrać wydarzeń');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Spróbuj ponownie</Button>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-8 bg-gradient-to-br min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black drop-shadow-md">Events</h1>
        <Link href="/dashboard/events/new">
          <Button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(255,182,255,0.5)] hover:shadow-[0_0_20px_rgba(255,182,255,0.7)] border-2 border-pink-400/50 px-6 py-3">
            Stwórz wydarzenie
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border-4 border-white/30 p-10 bg-gradient-to-br from-yellow-200 to-pink-200 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-3 text-pink-600">Brak wydarzenia</h2>
            <p className="text-lg text-orange-700 mb-6">
              Stwórz swoje pierwsze wydarzenie, aby rozpocząć
            </p>
            <Link href="/dashboard/events/new">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg transition-all duration-300">
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link href={`/dashboard/events/${event.id}`} key={event.id} className="transform transition-all duration-300 hover:scale-105">
              <Card className="overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-white to-yellow-100 border-2 border-white">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-pink-400 p-4">
                  <CardTitle className="text-xl font-bold text-white truncate">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-orange-700 mb-3">
                    <MapPinIcon className="h-5 w-5 text-pink-500" />
                    <span className="font-medium truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-orange-700">
                    <CalendarIcon className="h-5 w-5 text-pink-500" />
                    <span className="font-medium">{new Date(event.event_date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
